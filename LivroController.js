import Livro from "../model/LivroModel.js";

async function listar(request,response){
    const respostaBanco = await Livro.findAll();
    response.json(respostaBanco);
}

async function selecionar(request,response){
    const id = request.params.idlivro;
    const respostaBanco = await Livro.findByPk(id);
    response.json(respostaBanco);
}

//Questão 13
async function listarDisponiveis(request,response){
    const respostaBanco = await Livro.findAll({
        where: {
          emprestado: false,
          ativo: true,
        },
      });
    
    response.json(respostaBanco);
}

async function inserir(request,response){
    const respostaBanco = await Livro.create(request.body);
    response.json(respostaBanco);
}

async function editar(request,response){
    const titulo = request.body.titulo;
    const edicao = request.body.edicao;
    const paginas = request.body.paginas;
    const publicacao = request.body.publicacao;
    const foto = request.body.foto;
    const localizacao = request.body.localizacao;
    const resumo = request.body.resumo;
    const ativo = request.body.ativo;
    const condicaofisica = request.body.condicaofisica;
    const emprestado = request.body.emprestado;
    const idlivro = request.params.idlivro;
    const respostaBanco = await Livro.update({titulo, edicao, paginas, publicacao, foto, localizacao, resumo, ativo, condicaofisica, emprestado}, {where: {idlivro}});
    response.json(respostaBanco);
}

async function excluir(request,response){
    const idlivro = request.params.idlivro;
    const respostaBanco = await Livro.destroy({where: {idlivro}});
    response.json(respostaBanco);
}

export default {listar, selecionar, inserir, editar, excluir, listarDisponiveis};