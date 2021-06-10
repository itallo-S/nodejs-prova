const mongoose = require('mongoose');

module.exports = (app) => {

    const ProdutoController = {

        cadastrar(request, response) {

            mongoose.connect(
                app.constantes.bd.connection,
                app.constantes.bd.connectionParams
            )
            .then(() => {

                let precoN = parseFloat(request.body.preco);
                let codigoN = parseInt(request.body.codigo);
                request.body.preco = precoN;
                request.body.codigo = codigoN;

                if (precoN <= 0 ){
                    mongoose.disconnect();
                    response.status(400).send(`O preço do produto deve ser maior do que 0`);
                    if (request.body.codigo <= 0){
                        mongoose.disconnect();
                        response.status(400).send(`O Código do produto deve ser maior do que 0`);
                    }
                } else {
                 
                    if (!request.body.data_hora_de_cadastro){
                        request.body.data_hora_de_cadastro = new Date();
                    }
    
                    const Produtos = app.models.produto;
                    const produtos = new Produtos(request.body)

                    Produtos.create(produtos)
                    .then((result) => {
                        console.log(`Produto Cadastrado com Sucesso! ${result}`);
                        mongoose.disconnect();
                        response.status(200).send(`Produto Cadastrado com Sucesso!: ${result}`);
                    
                    })
                    .catch((err) => {
                        console.log(`Falha ao cadastrar o produo ${err}`);
                        mongoose.disconnect();
                        response.status(200).send(`Falha ao cadastrar o produo ${err}`);
                    });
                }

            })
            .catch(app.constantes.bd.erroConexao);
        },

        atualizar(request, response){

            mongoose.connect(
                app.constantes.bd.connection,
                app.constantes.bd.connectionParams
            )
            .then(() => {
                
                if (request.body.preco <= 0) {
                    response.status(400).send(`O preço do produto deve ser maior que zero`);
                
                } else {
                    
                    const Produtos = app.models.produto;    

                    Produtos.updateOne(
                        {codigo: request.params.codigo},
                        { $set:
                            {
                                preco: request.body.preco,
                                data_hora_de_atualizacao_de_preco: new Date()
                            }
                        }    
                    )
                    .then((produtoModificado) => {
                        if (produtoModificado.nModified > 0){
                            
                            mongoose.disconnect();
                            response.status(200).send(`Preço produto cod. ${request.params.codigo} Atualizado`);

                        } else {
                            console.log(`Produto não encontrado`);
                            mongoose.disconnect();
                            response.status(404).send(`Produto não encontrado`);
                        
                        }
                    })
                    .catch((err) => {
                        console.log(`Erro ao atualizar Usuário`);
                        console.log(err);
                        response.status(500).send(`Erro ao atualizar Usuário ${err}`);
                    });
                }
            })
            .catch(app.constantes.bd.erroConexao);
        },



        buscarCodigo(request, response){

            mongoose.connect(
                app.constantes.bd.connection,
                app.constantes.bd.connectionParams
            )
            .then(() => {
                
                const Produto = app.models.produto;
                Produto.find( {codigo: request.params.codigo} )
                .then((listaProdutos) => {
                    
                    if (listaProdutos.length > 0) {
                        mongoose.disconnect();
                        response.status(200).send(`Produto '${listaProdutos[0].descricao}' localizado: \n ${listaProdutos[0]}`)
                    
                    } else {
                        mongoose.disconnect();
                        response.status(404).send(`Produto '${request.params.codigo}' não localizado`)
                    
                    }
                })
                .catch((err) => {
                    mongoose.disconnect();
                    response.status(500).send(`Falha ao localizar o produto ${err}`);
                
                });
            })
            .catch(app.constantes.bd.erroConexao);
        },



        buscarDescricao(request, response){

            mongoose.connect(
                app.constantes.bd.connection,
                app.constantes.bd.connectionParams
            )
            .then(() => {

                const Produto = app.models.produto;
                const descricao = request.params.descricao
                Produto.find( {descricao: { $regex: `.*${descricao}.*`, $options: 'i' }} )
                .then((listaProdutos) => {
                    
                    if (listaProdutos.length > 0) {
                        mongoose.disconnect();
                        response.status(200).send(`Produto '${listaProdutos[0].descricao}' localizado: \n ${listaProdutos[0]}`)
                    
                    } else {
                        mongoose.disconnect();
                        response.status(404).send(`Produto não localizado`)
                    }
                })
                .catch((err) => {
                    mongoose.disconnect();
                    response.status(500).send(`Erro ao localizar o Produto: ${err}`);
                
                });
            })
            .catch(app.constantes.bd.erroConexao);
        }
    }

    return ProdutoController;
}