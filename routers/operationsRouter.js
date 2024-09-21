const express = require('express');
const router = express.Router();
const { calculate, readFileAndConvert, startInterval, asyncTask } = require('../controllers/operationsController');

// Ruta para las operaciones aritméticas
router.get('/calculate', calculate);

// Ruta para leer archivo y convertir a mayúsculas
router.get('/readfile', readFileAndConvert);

// Ruta para el intervalo de tiempo
router.get('/interval', startInterval);

// Ruta para la tarea asíncrona
router.get('/asynctask', asyncTask);

module.exports = router;
