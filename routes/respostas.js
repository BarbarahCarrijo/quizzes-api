module.exports = app => {

	const Respostas = app.db.models.Respostas;


	app.route("/respostas") //Middleware de pré-execução das rotas
		.get((req, res) => { // "/respostas": Lista todas as Respostas
			Respostas.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Respostas.create(req.body) // "/respostas": Cadastra uma nova resposta
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/respostas/:id")
		.get((req, res) => { // "/respostas/1": Consulta apenas uma resposta expecífica
			Respostas.findOne({where: req.params})
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
		.put((req, res) => { // "/respostas/1":Atuliza a resposta
			Respostas.update(req.body,{where:req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/respostas/1":Exclui a resposta
			Respostas.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}