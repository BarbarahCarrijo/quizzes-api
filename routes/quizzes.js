module.exports = app => {

	const Quizzes = app.db.models.Quizzes;

	app.route("/quizzes") //Middleware de pré-execução das rotas
		.all(app.auth.authenticate())
		.get((req, res) => { // "/quizzes": Lista todas os Quizzes (Ele está listando todos os quizzes por usuário que cadastrou)
		 Quizzes.findAll({
			 where:{usuario_id: req.user.id} //Certo, ele vai pegar o usuário logado
		 })
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			req.body.UsuarioId = req.user.id;
		 	Quizzes.create(req.body) // "/quizzes": Cadastra um novo quiz
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/quizzes/:id")
		.all(app.auth.authenticate())
		.get((req, res) => { // "/quizzes"/1": Consulta apenas um quizz expecífico
		 Quizzes.findOne({where: {
			id: req.params.id,
			usuario_id: req.user.id
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
		.put((req, res) => { // "/quizzes"/1":Atuliza o quiz
		 Quizzes.update(req.body,{where: {
			id: req.params.id,
			usuario_id: req.user.id
		}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/quizzes"/1":Exclui o quiz
		 Quizzes.destroy({where: {
			id: req.params.id,
			usuario_id: req.user.id
		}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}