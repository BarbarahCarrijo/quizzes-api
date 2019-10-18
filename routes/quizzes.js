module.export = app => {

	const Quizzes = app.models.Quizzes;


	app.route("/quizzes") //Middleware de pré-execução das rotas
		.get((req, res) => { // "/quizzes": Lista todas os Quizzes
		 Quizzes.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
		 Quizzes.create(req.body) // "/quizzes": Cadastra um novo quiz
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/quizzes/:id")
		.get((req, res) => { // "/quizzes"/1": Consulta apenas um quizz expecífico
		 Quizzes.findOne({where: req.params})
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
		 Quizzes.update(req.body,{where:req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/quizzes"/1":Exclui o quiz
		 Quizzes.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}