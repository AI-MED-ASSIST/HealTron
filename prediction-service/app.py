from bson.objectid import ObjectId
import os
import re
import json
from datetime import datetime
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pandas as pd
from pymongo import MongoClient
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Config
MONGO_URI    = os.getenv("MONGODB_URI")
DB_NAME      = os.getenv("MONGODB_DBNAME")
CHAT_API_URL = os.getenv("CHAT_API_URL")
PORT         = int(os.getenv("PREDICT_PORT", 5001))

# MongoDB
mongo            = MongoClient(MONGO_URI)
db               = mongo[DB_NAME]
predictions_col  = db["predictions"]

# Load disease dataset
BASE_DIR   = os.path.dirname(__file__)
DATA_PATH  = os.path.join(BASE_DIR, "data", "Processed_dataset.csv")
df_disease = pd.read_csv(DATA_PATH, header=None)

@app.route("/api/symptoms", methods=["GET"])
def get_symptoms():
    try:
        all_syms = set()
        for _, row in df_disease.iloc[1:].iterrows():
            syms = [str(s).strip() for s in row.iloc[1:].dropna().tolist()]
            all_syms.update(syms)
        return jsonify({"symptoms": sorted(all_syms)})
    except Exception as e:
        return jsonify({"error": f"Could not load symptoms: {e}"}), 500

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        payload   = request.get_json(force=True)
        user_id   = payload.get("userId")
        # Normalize: strip, lowercase, replace spaces → underscores
        user_syms = {
            s.strip().lower().replace(" ", "_")
            for s in payload.get("symptoms", [])
            if isinstance(s, str)
        }

        # 1) Dataset matching ≥ 51%
        best_pct, best_disease = 0.0, None
        for _, row in df_disease.iterrows():
            disease = str(row.iloc[0]).strip()
            row_syms = [
                str(s).strip().lower().replace(" ", "_")
                for s in row.iloc[1:].dropna().tolist()
            ]
            if not row_syms:
                continue
            match_count = sum(1 for s in row_syms if s in user_syms)
            pct = match_count / len(row_syms)
            if pct > best_pct:
                best_pct, best_disease = pct, disease

        if best_pct >= 0.51:
            accuracy = round(best_pct, 2)
            prompt = (
                f"I am AI-Med Assist. The patient's symptoms {sorted(user_syms)} "
                f"match '{best_disease}' at {accuracy*100}%. Provide medical advice and next steps."
            )
            try:
                resp = requests.post(
                    CHAT_API_URL,
                    json={"message": prompt, "userId": user_id},
                    timeout=10
                )
                reco = resp.json().get("response", "")
            except:
                reco = "Unable to fetch medical recommendation at this time."

            result = {
                "predictedDisease": best_disease,
                "accuracy": accuracy,
                "recommendation": reco
            }

        else:
            # 2) Fallback: strict JSON prompt
            ai_prompt = (
                f"Based solely on the symptoms {sorted(user_syms)}, predict the most likely disease. "
                "Do not respond with 'Unknown'; match the best possible disease. "
                "Provide an accuracy percentage (within 0.8-1)for the prediction, and then offer relevant medical advice. "
                "Respond strictly in the following JSON format:\n"
                "{\n"
                '  "predictedDisease": "Disease Name",\n'
                '  "accuracy": percentage_value,\n'
                '  "recommendation": "Detailed medical advice based on the prediction."\n'
                "}"
            )
            resp    = requests.post(
                CHAT_API_URL,
                json={"message": ai_prompt, "userId": user_id},
                timeout=15
            )
            ai_text = resp.json().get("response", "")

            # Strip any ```json ... ``` fences
            ai_text = re.sub(r"^```json\s*|\s*```$", "", ai_text, flags=re.DOTALL).strip()

            try:
                ai_data = json.loads(ai_text)
                pdisease = ai_data.get("predictedDisease")
                acc      = float(ai_data.get("accuracy"))
                reco     = ai_data.get("recommendation")
            except:
                pdisease, acc, reco = "Unknown", 0.0, ai_text

            result = {
                "predictedDisease": pdisease,
                "accuracy": acc,
                "recommendation": reco
            }

        # Persist
        predictions_col.insert_one({
            "userId": user_id,
            "symptoms": list(user_syms),
            **result,
            "createdAt": datetime.utcnow()
        })

        return Response(json.dumps(result, indent=2), mimetype="application/json")

    except Exception as e:
        return jsonify({"error": f"Prediction error: {e}"}), 500


@app.route("/api/predictions/<user_id>", methods=["GET"])
def get_prediction_history(user_id):
    try:
        # fetch and sort descending by createdAt
        docs = list(
            predictions_col.find({"userId": user_id})
            .sort("createdAt", -1)
        )
        # convert to JSON‐serializable
        preds = []
        for d in docs:
                preds.append({
                "id": str(d["_id"]),                         # <— include id
                "disease": d["predictedDisease"],
                "accuracy": d["accuracy"],
                "recommendation": d["recommendation"],
                "timestamp": d["createdAt"].isoformat()
            })
        return jsonify({"predictions": preds})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/predictions/<prediction_id>", methods=["DELETE"])
def delete_prediction(prediction_id):
    try:
        oid = ObjectId(prediction_id)             # ← requires bson.objectid.ObjectId
        result = predictions_col.delete_one({"_id": oid})
        if result.deleted_count == 1:
            return jsonify({"success": True})
        return jsonify({"error": "Not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
