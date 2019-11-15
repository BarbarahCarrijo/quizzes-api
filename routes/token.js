const jwt = require('jwt-simple');

module.exports = app => {
    const cfg = app.libs.config;
    const Usuarios = app.db.models.Usuarios;

    app.post("/token", (req, res) => {
        if (req.body.email && req.body.senha && req.body.tipo) {
            const email = req.body.email;
            const senha = req.body.senha;
            const tipo = req.body.tipo;

            Usuarios.findOne({where: {email: email}})
                .then(usuario => {
                    if (Usuarios.issenha(usuario.senha, senha)){
                        const payload = {id: usuario.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }
    })
}