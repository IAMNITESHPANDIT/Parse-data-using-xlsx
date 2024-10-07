const express = require('express');

const { uploadExcel, upload } = require('../controller/csvController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadExcel);

module.exports = router;
