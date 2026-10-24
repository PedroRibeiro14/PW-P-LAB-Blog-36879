const Artigo     = require('../models/Artigo');
const Utilizador = require('../models/Utilizador');

exports.listar = async (req, res, next) => {
  try {
    const { categoria, page = 1, limit = 10 } = req.query;
    const where = { publicado: true };
    if (categoria) where.categoria = categoria;

    const offset = (page - 1) * limit;
    const { count, rows: artigos } = await Artigo.findAndCountAll({
      where,
      include: [{ model: Utilizador, as: 'autor', attributes: ['nome', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit:  Number(limit),
      offset: Number(offset),
    });

    res.json({ total: count, page: Number(page), totalPaginas: Math.ceil(count / limit), artigos });
  } catch (err) { next(err); }
};

exports.obter = async (req, res, next) => {
  try {
    const artigo = await Artigo.findByPk(req.params.id, {
      include: [{ model: Utilizador, as: 'autor', attributes: ['nome', 'email'] }],
    });
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado' });
    res.json({ artigo });
  } catch (err) { next(err); }
};

exports.criar = async (req, res, next) => {
  try {
    const artigo = await Artigo.create({ ...req.body, autorId: req.utilizador.id });
    res.status(201).json({ artigo });
  } catch (err) { next(err); }
};

exports.atualizar = async (req, res, next) => {
  try {
    const artigo = await Artigo.findByPk(req.params.id);
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado' });
    if (artigo.autorId !== req.utilizador.id && req.utilizador.role !== 'admin') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }
    await artigo.update(req.body);
    res.json({ artigo });
  } catch (err) { next(err); }
};

exports.apagar = async (req, res, next) => {
  try {
    const artigo = await Artigo.findByPk(req.params.id);
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado' });
    if (artigo.autorId !== req.utilizador.id && req.utilizador.role !== 'admin') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }
    await artigo.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};
