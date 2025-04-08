const RegistroModel = require('../models/Registro.js');
const ModuloModel = require('../models/Modulo.js');
const UsuarioModel = require('../models/Usuario.js');
const HoraModel = require('../models/Hora.js');
const GrupoModel = require('../models/Grupo.js');
const MateriaModel = require('../models/Materia.js');
const DocenteModel = require('../models/Usuario.js');
const RolModel = require('../models/Rol.js');
const AulaModel = require('../models/Aula.js');
const CarreraModel = require('../models/Carrera.js');
const Op = require('sequelize').Op;
// const { Sequelize } = require('sequelize');
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
                    as: 'grupo',
                    include: { all: true, nested: true }
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
module.exports.getModulosByHoraAndFecha = async (req, res) => {

    try {
        const usuarioId = req.session.token.id;
        const horaId = req.query.horaId;
        const fecha = req.query.fecha;
        // console.log("DATOSSSSSSSSSSSSSSSSSSSSSSSSSS");
        // console.log(usuarioId, horaId, fecha);


        const modulos = await ModuloModel.findAll({
            where: { horaId: horaId },
            include: [
                {
                    model: HoraModel,
                    as: 'hora'
                },
                {
                    model: GrupoModel,
                    as: 'grupo',
                    include: { all: true, nested: true }
                },
                {
                    model: MateriaModel,
                    as: 'materia'
                },
                {
                    model: DocenteModel,
                    as: 'docente',
                    where: { rolId: 4 }
                },
                {
                    model: AulaModel,
                    as: 'aula'
                }
            ],
            order: [[{ model: AulaModel, as: 'aula' }, 'id', 'ASC']]
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
                    where: { horaId: horaId }
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
module.exports.getMisAsistencias = async (req, res) => {
    try {
        const docenteId = req.session.token.id;
        const { fechaInicio, fechaFin } = req.query;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Las fechas son requeridas' });
        }

        const registros = await RegistroModel.findAll({
            where: {
                fecha: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            },
            include: [
                {
                    model: ModuloModel,
                    as: 'modulo',
                    where: { docenteId },
                    include: [
                        { model: MateriaModel, as: 'materia' },
                        { model: GrupoModel, as: 'grupo' },
                        { model: HoraModel, as: 'hora' }
                    ]
                },
                {
                    model: UsuarioModel,
                    as: 'usuario',
                    include: [{ model: RolModel, as: 'rol' }]
                }
            ],
            order: [['fecha', 'ASC']]
        });

        if (registros.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron registros en el periodo solicitado',
                periodo: `${fechaInicio} a ${fechaFin}`
            });
        }

        const clasesUnicas = [];
        const clasesMap = new Map();
        
        registros.forEach(registro => {
            const clave = `${registro.fecha}-${registro.moduloId}`;
            if (!clasesMap.has(clave)) {
                clasesMap.set(clave, true);
                clasesUnicas.push({
                    fecha: registro.fecha,
                    moduloId: registro.moduloId
                });
            }
        });
        
        const totalClasesUnicas = clasesUnicas.length;

        const calcularPorcentaje = (rolId) => {
            let asistencias = 0;
            
            clasesUnicas.forEach(clase => {
                const registro = registros.find(r => 
                    r.fecha === clase.fecha && 
                    r.moduloId === clase.moduloId && 
                    r.usuario?.rol?.id === rolId &&
                    r.impartida === true
                );
                
                if (registro) {
                    asistencias++;
                }
            });
            
            return Math.round((asistencias / totalClasesUnicas) * 100);
        };

        const resumen = {
            totalClasesUnicas: totalClasesUnicas,
            porcentajes: {
                administrador: calcularPorcentaje(1),
                jefeGrupo: calcularPorcentaje(2),
                checador: calcularPorcentaje(3),
                docente: calcularPorcentaje(4)
            }
        };

        return res.status(200).json({
            todosLosRegistros: registros,
            resumen: {
                totalDeClases: totalClasesUnicas,
                asistencias: {
                    administrador: `${resumen.porcentajes.administrador}%`,
                    jefeGrupo: `${resumen.porcentajes.jefeGrupo}%`,
                    checador: `${resumen.porcentajes.checador}%`,
                    docente: `${resumen.porcentajes.docente}%`
                },
                general: `Total de clases en el periodo: ${totalClasesUnicas}`,
                administrador: `Según el administrador, asististe el ${resumen.porcentajes.administrador}% de las clases`,
                jefeGrupo: `Según el jefe de grupo, asististe el ${resumen.porcentajes.jefeGrupo}% de las clases`,
                checador: `Según el checador, asististe el ${resumen.porcentajes.checador}% de las clases`,
                docente: `Según tu registro, asististe el ${resumen.porcentajes.docente}% de las clases`
            },
            periodo: `${fechaInicio} a ${fechaFin}`
        });

    } catch (error) {
        console.error('Error en getMisAsistencias:', error);
        return res.status(500).json({
            message: 'Error al generar el reporte',
            error: error.message
        });
    }
};