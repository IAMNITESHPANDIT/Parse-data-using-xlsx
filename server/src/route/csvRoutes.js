const express = require('express');

const { uploadExcelOrCSV, upload, fetchCsvData } = require('../controller/csvController');

const router = express.Router();

router.get('/CSV', fetchCsvData);

router.post('/CSV', upload.single('file'), uploadExcelOrCSV);

module.exports = router;
