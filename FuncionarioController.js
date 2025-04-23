import Funcionario from "../model/FuncionarioModel.js";


async function listar(request,response){
    const respostaBanco = await Funcionario.findAll();
    response.json(respostaBanco);
}

async function selecionar(request,response){
    const id = request.params.idfuncionario;
    const respostaBanco = await Funcionario.findByPk(id);
    response.json(respostaBanco);
}

async function inserir(request,response){
    const respostaBanco = await Funcionario.create(request.body);
    response.json(respostaBanco);
}

async function editar(request,response){
    const nomefunctionario = request.body.nomefunctionario;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const senha = request.body.senha;
    const nascimento = request.body.nascimento;
    const telefone = request.body.telefone;
    const salario = request.body.salario;
    const contratacao = request.body.contratacao;
    const demissao = request.body.demissao;
    const ativo = request.body.contratacao;
    const token = request.body.demissao;
    const idfuncionario = request.params.idfuncionario;
    const respostaBanco = await Funcionario.update({nomefunctionario, cpf, email, senha, nascimento, telefone, salario, contratacao, demissao, ativo, token}, {where: {idfuncionario}});
    
    response.json(respostaBanco);

}
//Questão 4
async function trocarSenha(request,response){
    const senha = request.body.senha;
    const idusuario = request.params.idfuncionario;
    const respostaBanco = await Funcionario.update({senha}, {where: {idfuncionario}});
    const usuarioBanco = await Funcionario.findByPk(idusuario);
    if(!usuarioBanco){
        response.status(422).send('Este usuário não existe!');
    }
    //falta fazer validação para quantidade de caracteres

    response.json(respostaBanco);
}

async function excluir(request,response){
    const idfuncionario = request.params.idfuncionario;
    const respostaBanco = await Funcionario.destroy({where: {idfuncionario}});
    response.json(respostaBanco);
}

export default {listar, selecionar, inserir, editar, excluir, trocarSenha};