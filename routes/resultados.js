module.export = app => {

	const Resultados = app.models.Resultados;


	app.route("/resultados") //Middleware de pré-execução das rotas
		.get((req, res) => { // "/resultados": Lista todas os resultados
			Resultados.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Resultados.create(req.body) // "/resultados": Cadastra um novo resultado
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/resultados/:id")
		.get((req, res) => { // "/resultados/1": Consulta apenas um resultados expecífica
			Resultados.findOne({where: req.params})
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
			Resultados.update(req.body,{where:req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/resultados/1":Exclui o resultado
			Resultados.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}