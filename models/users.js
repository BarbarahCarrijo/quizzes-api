module.exports = (sequelize, DataType) => {
    const Usuarios = sequelize.define("Usuarios", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
            unique: false,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        },
        tipo: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            VALIDATE: {
                notEmpty: true
            }
        }
    });

    Usuarios.associate = function(models) {
        Usuarios.hasMany(models.Quizzes);
    };
    return Usuarios;
};