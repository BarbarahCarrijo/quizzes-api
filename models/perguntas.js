module.exports = (sequelize, DataType) => {
    const Perguntas = sequelize.define("Perguntas", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        enunciado: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        numero: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Perguntas.associate = function(models) {
        Perguntas.belongsTo(models.Quizzes);
    };

    Perguntas.associate = function(models) {
        Perguntas.hasMany(models.Respostas);
    };

    return Perguntas;
}