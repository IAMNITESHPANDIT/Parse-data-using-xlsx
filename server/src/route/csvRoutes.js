const express = require('express');

const { uploadExcel, upload, fetchCsvData } = require('../controller/csvController');

const router = express.Router();

router.post('/CSV', upload.single('file'), uploadExcel);

router.get('/CSV', upload.single('file'), fetchCsvData);

module.exports = router;
