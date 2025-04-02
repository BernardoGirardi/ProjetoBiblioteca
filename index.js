import express from "express";
import {Sequelize} from "sequelize";

const sequelize = new Sequelize('biblioteca2025', 'postgres', 'Mxk&6qh8', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

try {
    await sequelize.authenticate();
    console.log('Conexão feita com sucesso!');
  } catch (error) {
    console.error('Falha na conexão:', error);
  }
  
const app = express();
app.use(express.json());

app.get('/teste',(request,response)=>{
    response.send('É os guri pae');
});

app.listen(6969, ()=>{console.log('Servidor rodando.')});
