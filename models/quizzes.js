module.exports = (sequelize, DataType) => {
    const Quizzes = sequelize.define("Quizzes", {
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
        }
    });

    Quizzes.associate = function(models) {
        Quizzes.belongsTo(models.Usuarios);
    };

    Quizzes.associate = function(models) {
        Quizzes.hasMany(models.Perguntas);
    };

    return Quizzes;
}