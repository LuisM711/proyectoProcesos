const RegistroModel = require('../models/Registro.js');
const ModuloModel = require('../models/Modulo.js');
const UsuarioModel = require('../models/Usuario.js');
const HoraModel = require('../models/Hora.js');
const GrupoModel = require('../models/Grupo.js');
const MateriaModel = require('../models/Materia.js');
const DocenteModel = require('../models/Usuario.js');
const RolModel = require('../models/Rol.js');

module.exports.getRegistros = async (req, res) => {
    try {
        const registros = await RegistroModel.findAll({
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
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
                        }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [
                        {
                            model: RolModel,
                            as: 'rol'
                        }
                    ]
                }
            ]
        });
        return res.json(registros);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.getRegistroById = async (req, res) => {
    try {
        const registro = await RegistroModel.findByPk(req.params.id, {
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
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
                        }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [
                        {
                            model: RolModel,
                            as: 'rol'
                        }
                    ]
                }
            ]
        });
        if (!registro) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        return res.json(registro);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
module.exports.getRegistrosByFecha = async (req, res) => {
    try {
        const registros = await RegistroModel.findAll({
            where: { fecha: req.params.fecha },
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
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
                        }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [
                        {
                            model: RolModel,
                            as: 'rol'
                        }
                    ]
                }
            ]
        });
        return res.json(registros);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.postRegistro = async (req, res) => {
    try {
        const usuarioId = req.session.token.id;
        const registro = await RegistroModel.create({ ...req.body, usuarioId });
        return res.status(201).json(registro);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.putRegistro = async (req, res) => {
    try {
        const [updated] = await RegistroModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRegistro = await RegistroModel.findByPk(req.params.id, {
                include: [
                    {
                        model: ModuloModel,
                        as: 'modulo',
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
                            }
                        ]
                    },
                    {
                        model: UsuarioModel,
                        as: 'usuario'
                    }
                ]
            });
            return res.json(updatedRegistro);
        }
        return res.status(404).json({ message: 'Registro no encontrado' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.deleteRegistro = async (req, res) => {
    try {
        const deleted = await RegistroModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Registro eliminado correctamente' });
        }
        return res.status(404).json({ message: 'Registro no encontrado' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.getRegistrosByGrupo = async (req, res) => {
    try {
        const grupoId = req.params.grupoId;
        const fecha = req.query.fecha;

        // Validar que la fecha esté presente
        if (!fecha) {
            return res.status(400).json({ message: 'La fecha es requerida' });
        }

        const registros = await RegistroModel.findAll({
            where: {
                fecha: fecha
            },
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
                    where: { grupoId: grupoId },
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
                        }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [
                        {
                            model: RolModel,
                            as: 'rol'
                        }
                    ]
                }
            ]
        });
        return res.json(registros);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
module.exports.getModulosWithUserRegistros = async (req, res) => {
    try {
        const usuarioId = req.session.token.id;
        const grupoId = req.params.grupoId;
        const fecha = req.query.fecha;

  
        const modulos = await ModuloModel.findAll({
            where: { grupoId: grupoId },
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
                }
            ]
        });

        const registros = await RegistroModel.findAll({
            where: {
                usuarioId: usuarioId,
                fecha: fecha
            },
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
                    where: { grupoId: grupoId }
                }
            ]
        });

        const modulosWithRegistros = modulos.map(modulo => {
            const registro = registros.find(r => r.moduloId === modulo.id);
            return {
                ...modulo.toJSON(),
                registro: registro || null 
            };
        });

        return res.json(modulosWithRegistros);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
module.exports.getRegistrosByModulo = async (req, res) => {
    try {
        const registros = await RegistroModel.findAll({
            where: { moduloId: req.params.moduloId },
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
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
                        }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [
                        {
                            model: RolModel,
                            as: 'rol'
                        }
                    ]
                }
            ]
        });
        return res.json(registros);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};