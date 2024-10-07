const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Data } = require('../models/csv');

const uploadCsv = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];
    
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                const formattedData = results.map(row => ({ data: row }));
                
                // await Data.insertMany(formattedData);
                console.log("formatted", formattedData)
                res.status(201).json({ message: 'CSV data uploaded successfully!', data: results });
            } catch (error) {
                res.status(500).json({ message: 'Error saving data to database', error: error.message });
            }
        })
        .on('error', (err) => {
            res.status(500).json({ message: 'Error processing file', error: err.message });
        });
};

module.exports = {
    uploadCsv
};
