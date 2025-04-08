import express from "express";
import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize('biblioteca2025', 'postgres', 'Mxk&6qh8', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const Editora = sequelize.define(
    'editora',
    {
      // Model attributes are defined here
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    }
  );

try {
    await sequelize.authenticate();
    console.log('Conexão feita com sucesso!');
  } catch (error) {
    console.error('Falha na conexão:', error);
  };

  
const app = express();
app.use(express.json());

app.get('/teste',(request,response)=>{
    response.send('É os guri pae');
});

app.get('/editora', async (request,response)=>{
    const respostaBanco = await Editora.findAll();
    response.json(respostaBanco);
});

app.get('/editora/:id', async (request,response)=>{
    const id = request.params.id;
    const respostaBanco = await Editora.findByPk(id);
    response.json(respostaBanco);
});

app.post('/editora', async (request,response)=>{
    const respostaBanco = await Editora.create(request.body);
    response.json(respostaBanco);
});

app.put('/editora/:id', async (request,response)=>{
    const nomeeditora = request.body.nomeeditora;
    const cnpj = request.body.cnpj;
    const endereco = request.body.endereco;
    const ideditora = request.params.id;
    const respostaBanco = await Editora.update({nomeeditora, cnpj, endereco}, {where: {ideditora}});
    response.json(respostaBanco);
});

app.delete('/editora/:id', async (request,response)=>{
    const ideditora = request.params.id;
    const respostaBanco = await Editora.destroy({where: {ideditora}});
    response.json(respostaBanco);
});

app.listen(6969, ()=>{console.log('Servidor rodando.')});
