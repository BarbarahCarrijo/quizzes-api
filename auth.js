const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');

module.exports = app => {
    const Usuarios = app.db.models.Usuarios;
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromHeader("jwt")
    };
    const strategy = new Strategy(params, (payload, done) => {
        Usuarios.findByPk(payload.id)
            .then(usuario => {
                if (usuario) {
                    return done(null, {
                        id: usuario.id,
                        email: usuario.email, 
                        tipo: usuario.tipo
                    });
                }
                return done(null, false);
            })
        .catch(error => done(error, null));
    });
    passport.use(strategy);
    return{
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};