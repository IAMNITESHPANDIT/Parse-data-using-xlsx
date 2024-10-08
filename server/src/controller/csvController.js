const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const csvParser = require("csv-parser");
const { DynamicData } = require("../models/csv");

const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const uploadExcelOrCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(uploadsDir, req.file.filename);
  const extname = path.extname(req.file.originalname).toLowerCase();

  if (extname === ".xlsx") {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      await DynamicData.insertMany(jsonData);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });

      res
        .status(201)
        .json({
          message: "Excel data uploaded and saved successfully!",
          data: jsonData,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error processing Excel file", error: error.message });
    }
  } else if (extname === ".csv") {
    try {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          await DynamicData.insertMany(results);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          });

          res
            .status(201)
            .json({
              message: "CSV data uploaded and saved successfully!",
              data: results,
              status: 201,
            });
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error processing CSV file", error: error.message });
    }
  } else {
    return res
      .status(400)
      .json({
        message:
          "Unsupported file format. Please upload Excel or CSV files only.",
        status: 400,
      });
  }
};

const fetchCsvData = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const data = await DynamicData.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await DynamicData.countDocuments();

    res.status(200).json({
      totalCount,
      currentPage: pageNumber,
      total: Math.ceil(totalCount / pageSize),
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
};

module.exports = {
  uploadExcelOrCSV,
  upload,
  fetchCsvData,
};
