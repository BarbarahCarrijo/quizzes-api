module.exports = app => {

	const Respostas = app.db.models.Respostas;

	app.route("/perguntas/:id/respostas") //Middleware de pré-execução das rotas - ou assim: /perguntas/:perguntas_id
		.all(app.auth.authenticate())
		.get((req, res) => { // "/respostas": Lista todas as Respostas, filtrando por perguntas a qual pertencem
			Respostas.findAll({
				where: {perguntas_id: req.params.id} //where: {quiz_id: req.params.id}
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			req.params.id = req.respostas.pergunta_id; //req.params.id = req.perguntas.quiz_id;
			Respostas.create(req.body) // "/respostas": Cadastra uma nova resposta - Só o usuário do tipo Admin deve ter acesso a esse método
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/respostas/:id")
		.all(app.auth.authenticate())
		.get((req, res) => { // "/respostas/1": Consulta apenas uma resposta expecífica
			Respostas.findOne({where: {
				id: req.params.id 
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
		.put((req, res) => { // "/respostas/1":Atuliza a resposta- Só o usuário do tipo Admin deve ter acesso a essa rota
			Respostas.update(req.body,{where: {
				id: req.params.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/respostas/1":Exclui a resposta - Só o usuário do tipo Admin deve ter acesso a essa rota
			Respostas.destroy({where: {
				id: req.params.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}