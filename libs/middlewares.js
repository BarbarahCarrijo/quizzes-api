module.exports = app => {
	
    const bodyParser = require('body-parser');

    app.set("port", 4000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};