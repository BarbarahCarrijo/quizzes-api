const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {
    const Usuarios = sequelize.define("Usuarios", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        },
        senha: {
            type: DataType.STRING,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        },
        tipo: {
            type: DataType.STRING,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        }
    });

    Usuarios.addHook("beforeCreate", (usuario, options) => {
        const salt = bcrypt.genSaltSync();
        usuario.senha = bcrypt.hashSync(usuario.senha, salt);
    });

    Usuarios.associate = function (models) {
        Usuarios.hasMany(models.Quizzes);
    };

    return Usuarios;
};