const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/cleanmart', 
{
    serverSelectionTimeoutMS: 2000
})

const port = 4000;

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const ProdutolimpezaSchema = new mongoose.Schema({
  id_produtolimpeza: { type: String, required: true },
  descricao: { type: String },
  fornecedor: { type: String },
  datafabricacao: { type: Date },
  quantidadeestoque: { type: Number },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtolimpeza = mongoose.model("Produtolimpeza", ProdutolimpezaSchema);

app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroprodutolimpeza", async (req, res) => {
  const id_produtolimpeza = req.body.id_produtolimpeza;
  const descricao = req.body.descricao;
  const fornecedor = req.body.id_fornecedor;
  const datafabricacao = req.body.datafabricacao;
  const quantidadeestoque = req.body.quantidadeestoque;

  const produtolimpeza = new Produtolimpeza({
    id_produtolimpeza: id_produtolimpeza,
    descricao: descricao,
    fornecedor: fornecedor,
    datafabricacao: datafabricacao,
    quantidadeestoque: quantidadeestoque,
  });

  try {
    const newProdutolimpeza = await produtolimpeza.save();
    res.json({
      error: null,
      msg: "Cadastro ok",
      ProdutolimpezaId: newProdutolimpeza._id,
    });
  } catch (error) {}
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
