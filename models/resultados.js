module.exports = (sequelize, DataType) => {
    const Resultados = sequelize.define("Resultados", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    Resultados.associate = function(models) {
        Resultados.belongsTo(models.Usuarios);
    };

    Resultados.associate = function(models) {
        Resultados.belongsTo(models.Respostas);
    };

    return Resultados;
}
