// const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = app => {
    const cfg = app.libs.config;
    const Usuarios = app.db.models.Usuarios;

    function generateToken(params = {}) {
        return jwt.sign(params, cfg.jwtSecret, {
            expiresIn: 86400,
        });
    }

    app.post("/authenticate", async (req, res) => {
        if (req.body.email && req.body.senha) {
            const email = req.body.email;
            const senha = req.body.senha;
            console.log(req.body);

            const user = await Usuarios.findOne({ where: { email: email } })

            console.log(user)
            if (!user)
                return res.status(400).send({ error: 'User not found' });

            if (!await bcrypt.compare(senha, user.senha))
                return res.status(400).send({ error: 'Invalid password' });

            user.senha = undefined;
            res.send({
                user,
                token: generateToken({ id: user.id }),
            });

        } else {
            res.sendStatus(401);
        }
    })
}
