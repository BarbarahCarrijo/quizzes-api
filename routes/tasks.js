module.export = app => {

	const QuizzesModel = app.models.tasks;

	app.route("/tasks")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/tasks": Lista de tarefas
			Quizzes.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			// "tasks": Cadastra uma nova tarefa
			Quizzes.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/tasks/:id")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/tasks/1": Consulta uma tarefa
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
			// "/tasks/1": Atualiza uma tarefa
			Quizzes.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			// "tasks/1": Exclui uma arefa
			Quizzes.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}

//Se der pau, revisar as rotas de listagem por id e todos (FindOne e FindAll).