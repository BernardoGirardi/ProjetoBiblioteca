import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";
import autor from "./controller/AutorController.js";
import categoria from "./controller/CategoriaController.js";
import livro from "./controller/LivroController.js";
import usuario from "./controller/UsuarioController.js";
import emprestimo from "./controller/EmprestimoController.js";

//Testar conexão do banco

try {
    await banco.authenticate();
    console.log('Conexão feita com sucesso!');
  } catch (error) {
    console.error('Falha na conexão:', error);
  };

const app = express();
app.use(express.json());

//CRUD Editora

app.get('/editora', editora.listar);
app.get('/editora/:ideditora', editora.selecionar);
app.post('/editora', editora.inserir);
app.put('/editora/:ideditora', editora.editar);
app.delete('/editora/:ideditora', editora.excluir);

//CRUD Autor

app.get('/autor', autor.listar);
app.get('/autor/:idautor', autor.selecionar);
app.post('/autor', autor.inserir);
app.put('/autor/:idautor', autor.editar);
app.delete('/autor/:idautor', autor.excluir);

//CRUD Categoria

app.get('/categoria', categoria.listar);
app.get('/categoria/:idcategoria', categoria.selecionar);
app.post('/categoria', categoria.inserir);
app.put('/categoria/:idcategoria', categoria.editar);
app.delete('/categoria/:idcategoria', categoria.excluir);

//CRUD Livro

app.get('/livro', livro.listar);
app.get('/livro/:idlivro', livro.selecionar);
app.post('/livro', livro.inserir);
app.put('/livro/:idlivro', livro.editar);
app.delete('/livro/:idlivro', livro.excluir);

//CRUD Usuario

app.get('/usuario', usuario.listar);
app.get('/usuario/:idusuario', usuario.selecionar);
app.post('/usuario', usuario.inserir);
app.put('/usuario/:idusuario', usuario.editar);
app.put('/trocarSenha/:idusuario', usuario.trocarSenha);
app.delete('/usuario/:idusuario', usuario.excluir);

//CRUD emprestimo

app.get('/emprestimo', emprestimo.listar);
app.get('/listarPendente', emprestimo.listarPendente);
app.get('/emprestimo/:idemprestimo', emprestimo.selecionar);
app.post('/emprestar', emprestimo.emprestar);
app.put('/devolver/:idemprestimo', emprestimo.devolver);


app.listen(6969, ()=>{console.log('Servidor rodando.')});
