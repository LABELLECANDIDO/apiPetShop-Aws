require('dotenv').config();
const mongoose = require("mongoose");
const uri = "mongodb+srv://dilermandobrito:5r1IN0TkHlKGBd2M@clusterpetshop.cbih1jk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPetShop";

mongoose.connect(uri, {})
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB', err);
    });

module.exports = mongoose;