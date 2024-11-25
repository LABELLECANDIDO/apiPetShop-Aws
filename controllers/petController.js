const Pet = require('../models/Pet');
const Cliente = require('../models/Cliente');
const logger = require('../logger'); // Importando o logger

class PetController {
    // Criar um novo pet
    async createPet(req, res) {
        try {
            const pet = new Pet(req.body);
            await pet.save();

            // Associar o pet ao cliente
            await Cliente.findByIdAndUpdate(pet.dono, { $push: { pets: pet._id } });

            return res.status(201).json(pet);
        } catch (error) {
            logger.error(`Erro ao criar pet: ${error.message}`); // Logando o erro
            return res.status(400).json({ error: error.message });
        }
    }

    // Buscar todos os pets ou filtrar por nome
    async getAllPets(req, res) {
        try {
            const filter = {};
            if (req.query.nome) {
                filter.nome = req.query.nome;
            }
            const pets = await Pet.find(filter).populate('dono', 'nome');
            return res.status(200).json(pets);
        } catch (error) {
            logger.error(`Erro ao buscar pets: ${error.message}`); // Logando o erro
            return res.status(500).json({ error: error.message });
        }
    }

    // Pegar pet pelo ID
    async getPetById(req, res) {
        try {
            const pet = await Pet.findById(req.params.id).populate('dono', 'nome');
            if (!pet) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }
            return res.status(200).json(pet);
        } catch (error) {
            logger.error(`Erro ao buscar pet com ID ${req.params.id}: ${error.message}`); // Logando o erro
            return res.status(500).json({ error: error.message });
        }
    }

    // Atualizar pet pelo ID
    async updatePet(req, res) {
        try {
            const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!pet) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }
            return res.status(200).json(pet);
        } catch (error) {
            logger.error(`Erro ao atualizar pet com ID ${req.params.id}: ${error.message}`); // Logando o erro
            return res.status(400).json({ error: error.message });
        }
    }

    // Excluir pet pelo ID
    async deletePet(req, res) {
        try {
            const pet = await Pet.findByIdAndDelete(req.params.id);
            if (!pet) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }

            // Remover o pet do cliente associado
            await Cliente.findByIdAndUpdate(pet.dono, { $pull: { pets: pet._id } });

            return res.status(200).json({ message: 'Pet deletado com sucesso' });
        } catch (error) {
            logger.error(`Erro ao excluir pet com ID ${req.params.id}: ${error.message}`); // Logando o erro
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PetController();
