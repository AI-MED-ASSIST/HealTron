import fs from "fs"; // ES module import for fs
import Disease from "../models/disease.model.js";

// Existing function: fetch diseases
export const getDiseases = async (req, res) => {
  try {
    const filter = {};
    const searchQuery = req.query.q;
    if (searchQuery) {
      // Using a case-insensitive regex to match disease names
      filter.name = { $regex: searchQuery, $options: "i" };
    }
    const diseases = await Disease.find(filter).sort({ name: 1 });
    res.status(200).json({ diseases });
  } catch (error) {
    console.error("Error fetching diseases:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// New function: Upload diseases via file
export const uploadDiseases = async (req, res) => {
  try {
    // req.file contains the uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Read the file content (assuming JSON format)
    const data = fs.readFileSync(req.file.path, "utf8");
    const diseases = JSON.parse(data); // assuming the file contains a JSON array

    // Insert the diseases into the collection (using insertMany)
    const result = await Disease.insertMany(diseases);

    // Optionally, remove the temporary file
    fs.unlinkSync(req.file.path);

    res
      .status(201)
      .json({
        message: `${result.length} documents were inserted`,
        diseases: result,
      });
  } catch (error) {
    console.error("Error uploading diseases:", error.message);
    res.status(500).json({ error: error.message });
  }
};
