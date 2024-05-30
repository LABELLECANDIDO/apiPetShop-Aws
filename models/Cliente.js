const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const clienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    endereco: {
        rua: String,
        bairro: String,
        cidade: String
    },
    telefone: String,
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }]
}, {
    versionKey: false // Define a opção versionKey como false para remover o campo __v
});
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;