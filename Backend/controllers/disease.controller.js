// backend/controllers/disease.controller.js
import fs from "fs";
import Disease from "../models/disease.model.js";

export const getDiseases = async (req, res) => {
  try {
    const filter = {};
    if (req.query.q) {
      filter.name = { $regex: req.query.q, $options: "i" };
    }
    // find returns full docs: { _id, name }
    const diseases = await Disease.find(filter).sort({ name: 1 });
    res.status(200).json({ diseases });
  } catch (error) {
    console.error("Error fetching diseases:", error);
    res.status(500).json({ error: error.message });
  }
};

export const uploadDiseases = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const data = fs.readFileSync(req.file.path, "utf8");
    const arr = JSON.parse(data);
    // Expecting: [{ name: "Hypertension" }, { name: "Asthma" }, …]
    const result = await Disease.insertMany(arr, { ordered: false });
    fs.unlinkSync(req.file.path);
    // send back the inserted docs so front-end can grab their _ids if needed
    res.status(201).json({
      message: `${result.length} diseases inserted`,
      diseases: result,
    });
  } catch (error) {
    console.error("Error uploading diseases:", error);
    res.status(500).json({ error: error.message });
  }
};
