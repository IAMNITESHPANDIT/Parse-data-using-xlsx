
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');
const { DynamicData } = require('../models/csv');

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadExcel = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(uploadsDir, req.file.filename);
    const extname = path.extname(req.file.originalname).toLowerCase();

    if (extname === '.xlsx') {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);

            await DynamicData.insertMany(jsonData);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });

            res.status(201).json({ message: 'Excel data uploaded and saved successfully!', data: jsonData });
        } catch (error) {
            res.status(500).json({ message: 'Error processing Excel file', error: error.message });
        }
    } else {
        return res.status(400).json({ message: 'Unsupported file format. Please upload Excel files only.' });
    }
};

module.exports = {
    uploadExcel,
    upload,
};
