import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";
import moment from "moment"

async function listar(request,response){
    const respostaBanco = await Emprestimo.findAll();
    response.json(respostaBanco);
}

//Questão 12
async function listarPendente(request,response){
    const emprestimoBanco = await Emprestimo.findAll({
        where: {
          ativo: true,
        },
      });
    
      response.json(emprestimoBanco);
    
}


async function selecionar(request,response){
    const id = request.params.idemprestimo;
    const respostaBanco = await Emprestimo.findByPk(id);
    response.json(respostaBanco);
}

async function emprestar(request, response) {
    //Lendo os paramentros
    const idlivro = request.body.idlivro;
    const idusuario = request.body.idusuario;

    //verifica se existe o paramentro idlivro
    if (!idlivro) {
        response.status(422).send('O parâmetro idlivro é obrigatório.');
    }

    //verifica se existe o paramentro idusuario
    if (!idusuario) {
        response.status(422).send('O parâmetro idusuario é obrigatório.');
    }

    //verifica se o livro existe
    const livroBanco = await Livro.findByPk(idlivro);
    if (!livroBanco) {
        response.status(404).send('Livro não encontrado.');
    }

    //verifica se o usuário existe
    const usuarioBanco = await Usuario.findByPk(idusuario);
    if (!usuarioBanco) {
        response.status(404).send('Usuário não encontrado.');
    }

    //verifica se o livro está inativo
    if (!livroBanco.ativo) {
        response.status(422).send('Este livro está inativo.');
    }

    //verifica se o livro está emprestado
    if (livroBanco.emprestado) {
        response.status(422).send('Este livro já está emprestado.');
    }

    //setando data de emprestimo e data de vencimento
    const emprestimo = moment().format('YYYY-MM-DD');
    const vencimento = moment().add(15, 'days').format('YYYY-MM-DD');
    const ativo = true

    //inserindo o emprestimo no banco
    const respostaBanco = await Emprestimo.create({ idlivro, idusuario, emprestimo, vencimento, ativo});

    //alterando o campo emprestado do livro para true
    const emprestado = true;
    await Livro.update(
        { emprestado },
        { where: { idlivro } });

    response.json(respostaBanco);

}

async function devolver(request,response){
    const idemprestimo = request.params.idemprestimo;
    const idlivro = request.body.idlivro;
    const devolucao = moment().format('YYYY-MM-DD');
    const observacao = request.body.observacao;
    const respostaBanco = await Emprestimo.update({devolucao, observacao}, {where: {idemprestimo}});
    
    const emprestimoBanco = await Emprestimo.findByPk(idemprestimo);


    if (!emprestimoBanco){
        response.status(422).send('Este empréstimo não existe!');
    }

    if(!emprestimoBanco.ativo){
        response.status(422).send('Este empréstimo não está ativo!');
    }

        //alterando o campo emprestado do livro para false
        const emprestado = false;
        await Livro.update(
            { emprestado },
            { where: { idlivro } });

        //alterando o campo ativo do emprestimo para false
        const ativo = false;
        await Emprestimo.update(
            { ativo },
            { where: { idemprestimo } });
    
    response.json(respostaBanco);
}


export default {listar, selecionar, emprestar, devolver, listarPendente};