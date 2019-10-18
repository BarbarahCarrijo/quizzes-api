module.exports = app => {

	const Perguntas = app.db.models.Perguntas;


	app.route("/perguntas") //Middleware de pré-execução das rotas
		.get((req, res) => { // "/perguntas": Lista todas as perguntas
			Perguntas.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Perguntas.create(req.body) // "/perguntas": Cadastra uma nova pergunta
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/perguntas/:id")
		.get((req, res) => { // "/perguntas/1": Consulta apenas uma pergunta expecífica
			Perguntas.findOne({where: req.params})
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
			Perguntas.update(req.body,{where:req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/perguntas/1":Exclui a pergunta
			Perguntas.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}