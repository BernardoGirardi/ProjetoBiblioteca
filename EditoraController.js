import Editora from "../model/EditoraModel.js";

async function listar(request,response){
    const respostaBanco = await Editora.findAll();
    response.json(respostaBanco);
}

async function selecionar(request,response){
    const id = request.params.ideditora;
    const respostaBanco = await Editora.findByPk(id);
    response.json(respostaBanco);
}

async function inserir(request,response){
    const respostaBanco = await Editora.create(request.body);
    response.json(respostaBanco);
}

async function editar(request,response){
    const nomeeditora = request.body.nomeeditora;
    const cnpj = request.body.cnpj;
    const endereco = request.body.endereco;
    const ideditora = request.params.ideditora;
    const respostaBanco = await Editora.update({nomeeditora, cnpj, endereco}, {where: {ideditora}});
    response.json(respostaBanco);
}

async function excluir(request,response){
    const ideditora = request.params.ideditora;
    const respostaBanco = await Editora.destroy({where: {ideditora}});
    response.json(respostaBanco);
}

export default {listar, selecionar, inserir, editar, excluir};