const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const calculate = (req, res) => {
    const [,, num1, num2] = process.argv.map(Number);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Por favor, proporciona dos números válidos.');
    }

    res.json({
        suma: num1 + num2,
        resta: num1 - num2,
        multiplicacion: num1 * num2,
        division: num2 !== 0 ? num1 / num2 : 'No se puede dividir por cero'
    });
};

const readFileAndConvert = (req, res) => {
    const inputFilePath = path.join(__dirname, '../storage/input.txt');
    const outputFilePath = path.join(__dirname, '../storage/output.txt');

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return res.status(500).send('Error leyendo el archivo');
        }

        const outputData = data.toUpperCase();

        fs.writeFile(outputFilePath, outputData, (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                return res.status(500).send('Error escribiendo el archivo');
            }

            console.log('Archivo output.txt generado con éxito');
            res.send('Archivo output.txt generado con éxito');
        });
    });
};

const startInterval = (req, res) => {
    let seconds = 0;

    setInterval(() => {
        seconds++;
        console.log(`Han pasado ${seconds} segundos`);
    }, 1000);

    res.send('Intervalo iniciado');
};

const asyncTask = (req, res) => {
    const filePath = path.join(__dirname, '../storage/input.txt');

    fsPromises.readFile(filePath, 'utf8')
        .then(data => {
            console.log('Contenido del archivo:', data);
            res.send('Tarea asíncrona completada');
        })
        .catch(err => {
            console.error('Error leyendo el archivo:', err);
            res.status(500).send('Error leyendo el archivo');
        });
};

module.exports = {
    calculate,
    readFileAndConvert,
    startInterval,
    asyncTask
};
