const Comentario = require('../models/Comentario');
const Artigo     = require('../models/Artigo');
const Utilizador = require('../models/Utilizador');

exports.listar = async (req, res, next) => {
  try {
    const comentarios = await Comentario.findAll({
      where:   { artigoId: req.params.artigoId },
      include: [{ model: Utilizador, as: 'autor', attributes: ['nome'] }],
      order:   [['createdAt', 'DESC']],
    });
    res.json({ comentarios });
  } catch (err) { next(err); }
};

exports.criar = async (req, res, next) => {
  try {
    const artigo = await Artigo.findByPk(req.params.artigoId);
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado' });
    const comentario = await Comentario.create({
      conteudo: req.body.conteudo,
      autorId:  req.utilizador.id,
      artigoId: req.params.artigoId,
    });
    res.status(201).json({ comentario });
  } catch (err) { next(err); }
};

exports.apagar = async (req, res, next) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado' });
    if (comentario.autorId !== req.utilizador.id) {
      return res.status(403).json({ erro: 'Sem permissão' });
    }
    await comentario.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};
