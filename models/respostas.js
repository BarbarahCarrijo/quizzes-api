module.exports = (sequelize, DataType) => {
    const Respostas = sequelize.define("Respostas", {
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

    Respostas.associate = function(models) {
        Respostas.belongsTo(models.Perguntas);
    };

    Respostas.associate = function(models) {
        Respostas.hasMany(models.Resultados);
    };

    return Respostas;
}