module.exports = app => { //Teste git add -p

    const Usuarios = app.db.models.Usuarios;

app.route("/usuario")
    .all(app.auth.authenticate())
    .get((req, res) => {
        Usuarios.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "tipo"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: eror.message });
        });
    })
    .delete((req, res) => {
        Usuarios.destroy({ where: { id: req.user.id }})
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