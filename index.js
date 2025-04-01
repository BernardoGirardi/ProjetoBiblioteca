import express from "express";

const app = express();
app.use(express.json());

app.get('/teste',(request,response)=>{
    response.send('É os guri pae');
});

app.listen(6969, ()=>{console.log('Servidor rodando.')});
