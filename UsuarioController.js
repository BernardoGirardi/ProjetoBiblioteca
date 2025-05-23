import { CHAR } from "sequelize";
import Usuario from "../model/UsuarioModel.js";
import bcrypt from "bcrypt";


async function listar(request,response){
    const respostaBanco = await Usuario.findAll();
    response.json(respostaBanco);
}

async function selecionar(request,response){
    const id = request.params.idusuario;
    const respostaBanco = await Usuario.findByPk(id);
    response.json(respostaBanco);
}

async function inserir(request,response){
    const respostaBanco = await Usuario.create(request.body);
    response.json(respostaBanco);
}

async function editar(request,response){
    const nome = request.body.nome;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const senha = request.body.senha;
    const nascimento = request.body.nascimento;
    const telefone = request.body.telefone;
    const idusuario = request.params.idusuario;
    const respostaBanco = await Usuario.update({nome, cpf, email, senha, nascimento, telefone}, {where: {idusuario}});
    response.json(respostaBanco);
}

//Questão 7
async function trocarSenha(request,response){
    const senha = request.body.senha;
    const idusuario = request.params.idusuario;
    const respostaBanco = await Usuario.update({senha}, {where: {idusuario}});
    const usuarioBanco = await Usuario.findByPk(idusuario);
    if(!usuarioBanco){
        response.status(422).send('Este usuário não existe!');
    }
    //falta fazer validação para quantidade de caracteres

    response.json(respostaBanco);
}

async function excluir(request,response){
    const idusuario = request.params.idusuario;
    const respostaBanco = await Usuario.destroy({where: {idusuario}});
    response.json(respostaBanco);
}

export default {listar, selecionar, inserir, editar, excluir, trocarSenha};