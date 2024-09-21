require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const operationsRouter = require('./routers/operationsRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());  // Para parsear JSON

// Rutas
app.use('/api/operations', operationsRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
