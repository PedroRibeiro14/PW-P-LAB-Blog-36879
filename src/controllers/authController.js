const jwt        = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

const gerarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res, next) => {
  try {
    const { nome, email, password } = req.body;
    const utilizador = await Utilizador.create({ nome, email, password });
    const token = gerarToken(utilizador.id);
    res.status(201).json({
      token,
      utilizador: { id: utilizador.id, nome: utilizador.nome, email: utilizador.email, role: utilizador.role }
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const utilizador = await Utilizador.findOne({ where: { email } });
    if (!utilizador || !(await utilizador.compararPassword(password))) {
      return res.status(401).json({ erro: 'Email ou password incorretos' });
    }
    const token = gerarToken(utilizador.id);
    res.json({ token });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res) => {
  res.json({ utilizador: req.utilizador });
};
