const express = require("express");
const mongoose = require("./database");
const cors = require('cors');

const app = express();
const petRoutes = require("./routes/pets");
const clienteRoutes = require("./routes/clientes");

const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/pets', petRoutes);
app.use('/clientes', clienteRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json(err);
    } else {
        res.status(500).json(err);
    }
});

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err);
});