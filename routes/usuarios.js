module.exports = app => {

    const Usuarios = app.db.models.Usuarios;

    app.get("/usuarios")
        .all(app.auth.authenticate())
        .get((req, res) => { //tacar o tipo nessa porra aq, não exatamente aq, maaas, na autenticação
            Usuarios.findByPk(req.params.id, {
                attributes: ["id", "nome", "email", "senha", "tipo"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: eror.message });
        });
    })
    .delete((req, res) => {
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