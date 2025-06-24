const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('TU_URI_MONGO_ATLAS')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Modelo
const Material = mongoose.model('Material', new mongoose.Schema({
  nombre: String,
  descripcion: String,
  cantidadKg: Number,
  fechaRegistro: { type: Date, default: Date.now }
}));

// CRUD Materiales
app.post('/materiales', async (req, res) => res.json(await new Material(req.body).save()));
app.get('/materiales', async (req, res) => res.json(await Material.find()));
app.put('/materiales/:id', async (req, res) => {
  res.json(await Material.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete('/materiales/:id', async (req, res) => {
  res.json(await Material.findByIdAndDelete(req.params.id));
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
