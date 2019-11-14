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
        usuario.password = bcrypt.hashSync(usuario.password, salt);
    });

    Usuarios.associate = function (models) {
        Usuarios.hasMany(models.Quizzes);
    };

    Usuarios.isPassword = function (encodedPassword, password){
        return bcrypt.compareSync(password, encodedPassword);
    };

    return Usuarios;
};