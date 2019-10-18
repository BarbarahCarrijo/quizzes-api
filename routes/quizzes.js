module.export = app => {

	const QuizzesModel = app.models.quizzes;

	app.route("/quizzes")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/quizzes": Lista todos os Quizzes
			Quizzes.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			// "quizzes": Cadastra quiz
			Quizzes.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/quizzes/:id")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/quizzes/1": Consulta um quiz pelo id
			Quizzes.findOne({where: req.params})
				.then(result => {
					if (result){
						res.json(result);
					}else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => {
			// "/quizzes/1": Atualiza quiz
			Quizzes.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			// "quizzes/1": Exclui quiz
			Quizzes.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}

//Se der pau, revisar as rotas de listagem por id e todos (FindOne e FindAll).