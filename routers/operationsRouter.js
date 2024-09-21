const express = require('express');
const router = express.Router();
const { calculate, readFileAndConvert, startInterval, asyncTask } = require('../controllers/operationsController');

// Ruta para las operaciones aritméticas
router.get('/calculate', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Por favor, proporciona dos números válidos.');
    }

    const results = {
        suma: num1 + num2,
        resta: num1 - num2,
        multiplicacion: num1 * num2,
        division: num2 !== 0 ? num1 / num2 : 'No se puede dividir por cero'
    };

    res.json(results);
});

// Ruta para leer y convertir archivo
router.get('/read-file', readFileAndConvert);

// Ruta para iniciar el intervalo
router.get('/start-interval', startInterval);

// Ruta para la tarea asíncrona
router.get('/async-task', asyncTask);

module.exports = router;
