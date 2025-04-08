import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js"

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

app.listen(6969, ()=>{console.log('Servidor rodando.')});
