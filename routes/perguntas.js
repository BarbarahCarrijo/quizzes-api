module.export = app => {

	const PerguntasModel = app.models.Perguntas;

	app.route("/Perguntas")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/Perguntas": Lista de tarefas
			Perguntas.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			// "Perguntas": Cadastra uma nova tarefa
			Perguntas.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/Perguntas/:id")
		.all((req, res) => {
			//middleware de pré-execução das rotas
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			// "/Perguntas/1": Consulta uma tarefa
			Perguntas.findOne({where: req.params})
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
			// "/Perguntas/1": Atualiza uma tarefa
			Perguntas.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			// "Perguntas/1": Exclui uma arefa
			Perguntas.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}

//Revisar constante que não está sendo utilizada, avaliar declaração dentro dos métodos.
