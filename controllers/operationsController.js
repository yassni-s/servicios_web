const fs = require('fs');
const fsPromises = require('fs').promises;

// Operaciones aritméticas usando process.argv
exports.calculate = (req, res) => {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
        return res.status(400).json({ error: "Proporcione dos números" });
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    const result = {
        suma: a + b,
        resta: a - b,
        multiplicacion: a * b,
        division: b !== 0 ? a / b : "No se puede dividir entre cero"
    };

    res.json(result);
};

// Leer archivo y convertir a mayúsculas
exports.readFileAndConvert = (req, res) => {
    fs.readFile('./storage/input.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }

        const upperCaseData = data.toUpperCase();
        fs.writeFile('./storage/output.txt', upperCaseData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: "Error al escribir el archivo" });
            }
            res.json({ message: "El archivo se ha convertido y guardado" });
        });
    });
};

// Intervalo de tiempo usando setInterval
exports.startInterval = (req, res) => {
    let seconds = 0;
    const interval = setInterval(() => {
        seconds++;
        console.log(`Han pasado ${seconds} segundos`);

        // Opcional: detener después de 10 segundos
        if (seconds === 10) {
            clearInterval(interval);
        }
    }, 1000);

    res.json({ message: "Intervalo iniciado. Revisa la consola." });
};

// Tarea asíncrona
exports.asyncTask = (req, res) => {
    fsPromises.readFile('./storage/input.txt', 'utf8')
        .then(data => {
            res.json({ content: data });
        })
        .catch(err => {
            res.status(500).json({ error: "Error al leer el archivo de manera asíncrona" });
        });
};
