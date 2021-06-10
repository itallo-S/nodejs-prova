module.exports = (app) => {
    
    app.post(
        '/produto',
        app.controllers.produto.cadastrar
    );

    app.put(
        '/produto/:codigo/preco',
        app.controllers.produto.atualizar
    );

    app.get(
        '/produto/:codigo',
        app.controllers.produto.buscarCodigo
    );

    app.get(
        '/produto/descricao/:descricao',
        app.controllers.produto.buscarDescricao
    );
}