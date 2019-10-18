module.exports = app => {

    const Usuarios = app.db.models.Usuarios;

    app.get("/usuarios/:id", (req, res) => {
        Usuarios.findByPk(req.params.id, {
                attributes: ["id", "nome", "email", "senha"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: eror.message });
            });
    });

    app.delete("/usuarios/:id", (req, res) => {
        Usuarios.destroy({ where: { id: req.params.id } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
    
    app.post("/usuarios", (req, res) => {
        Usuarios.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};