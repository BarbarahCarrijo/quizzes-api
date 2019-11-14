module.exports = app => {

	const Perguntas = app.db.models.Perguntas;

	app.route("/perguntas") //Middleware de pré-execução das rotas
		.all(app.auth.authenticate())
		.get((req, res) => { // "/perguntas": Lista todas as perguntas
			Perguntas.findAll({
				where: {quizzes_id: req.quizzes.id} //filtra as perguntas pelo Quiz ao qual pertencem
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			req.body.QuizzesId = req.quizzes.id;
			Perguntas.create(req.body) // "/perguntas": Cadastra uma nova pergunta
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/perguntas/:id")
		.all(app.auth.authenticate())
		.get((req, res) => { // "/perguntas/1": Consulta apenas uma pergunta expecífica
			Perguntas.findOne({where: {
				id: req.params.id,
				quizzes_id: req.quizzes.id //as perguntas dever ter o id do quiz, não do usuario {quiz_id: req.quiz.id}
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
		.put((req, res) => { // "/perguntas/1":Atuliza a pergunta
			Perguntas.update(req.body,{where: {
				id: req.params.id,
				quizzes_id: req.quizzes.id 
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/perguntas/1":Exclui a pergunta
			Perguntas.destroy({where: {
				id: req.params.id,
				quizzes_id: req.quizzes.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}