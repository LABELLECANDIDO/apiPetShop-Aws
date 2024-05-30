const Cliente = require('../models/Cliente');
const Pet = require('../models/Pet');

class ClienteController {
    // criar um novo cliente
    async create(req, res) {
        try {
            const cliente = new Cliente(req.body);
            await cliente.save();
            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            //filtro
            let query = {}; 
            if (req.query.nome) {
                query.nome = { $regex: new RegExp(req.query.nome, ) }; 
            }
            const clientes = await Cliente.find(query).populate('pets');
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // obter um cliente pelo ID
    async getById(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id).populate('pets');
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // atualizar um cliente pelo ID
    async update(req, res) {
        try {
            const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // deletar um cliente pelo ID
    async delete(req, res) {
        try {
            const cliente = await Cliente.findByIdAndDelete(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'cliente não encontrado' });
            }

            // Deleta todos os pets associados ao cliente
            await Pet.deleteMany({ dono: cliente._id });

            return res.status(200).json({ message: 'Cliente e seus pets deletados com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async filtroDeletar(req, res) {
        try {
            const nome = req.params.nome;
            const cliente = await Cliente.findOneAndDelete({ nome });
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
    
            // Deleta todos os pets associados ao cliente
            await Pet.deleteMany({ dono: cliente._id });
    
            return res.status(200).json({ message: 'Cliente e seus pets deletados com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new ClienteController();