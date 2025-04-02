const DocenteModel = require('../models/Usuario.js');
const ModuloModel = require('../models/Modulo.js');
const GrupoModel = require('../models/Grupo.js');
const MateriaModel = require('../models/Materia.js');
const HoraModel = require('../models/Hora.js');
const AulaModel = require('../models/Aula.js');

module.exports.getModulos = async (req, res) => {
    try {
        const modulos = await ModuloModel.findAll(
            {
                include: [
                    {
                        model: HoraModel,
                        as: 'hora'
                    },

                    {
                        model: GrupoModel,
                        as: 'grupo'
                    },
                    {
                        model: MateriaModel,
                        as: 'materia'
                    },
                    {
                        model: DocenteModel,
                        as: 'docente',
                        where: {
                            rolId: 4
                        }

                    },
                    {
                        model: AulaModel,
                        as: 'aula'
                    }
                ]
            }
        );
        return res.json(modulos);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



module.exports.postModulo = async (req, res) => {
    try {
        const modulo = await ModuloModel.create(req.body);
        return res.json(modulo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.putModulo = async (req, res) => {
    try {
        const modulo = await ModuloModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(modulo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.deleteModulo = async (req, res) => {
    try {
        //destroy
        const modulo = await ModuloModel.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json(modulo);
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
}

module.exports.getModuloByGroup = async (req, res) => {
    try {
        const modulos = await ModuloModel.findAll({
            where: {
                grupoId: req.params.groupId
            },
            include: [
                {
                    model: HoraModel,
                    as: 'hora'
                },
                {
                    model: GrupoModel,
                    as: 'grupo'
                },
                {
                    model: MateriaModel,
                    as: 'materia'
                },
                {
                    model: DocenteModel,
                    as: 'docente',
                    where: {
                        rolId: 4
                    }
                },
                {
                    model: AulaModel,
                    as: 'aula'
                    //include all
                    
                }
            ],
            order: [
                ['hora', 'horaInicio', 'ASC']
            ]
        });
        return res.json(modulos);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
