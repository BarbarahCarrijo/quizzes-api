module.exports = app => {

	const Resultados = app.db.models.Resultados;

	app.route("/resultados") //Middleware de pré-execução das rotas
		.all(app.auth.authenticate())
		.get((req, res) => { // "/resultados": Lista todas os resultados
			Resultados.findAll({
				where: {usuario_id: req.usuario.id}
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			req.body.UsuarioId = req.usuario.id
			Resultados.create(req.body) // "/resultados": Cadastra um novo resultado
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/resultados/:id")
		.all(app.auth.authenticate())
		.get((req, res) => { // "/resultados/1": Consulta apenas um resultados expecífica
			Resultados.findOne({where: {
				id: req.params.id,
				usuario_id: req.usuario.id
			}})
				.then(result => {
					if (result){
						res.json(result);
					} else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => { // "/resultados/1":Atuliza o resultado
			Resultados.update(req.body,{where: {
				id: req.params.id,
				usuario_id: req.usuario.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/resultados/1":Exclui o resultado
			Resultados.destroy({where: {
				id: req.params.id,
				usuario_id: req.usuario.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}