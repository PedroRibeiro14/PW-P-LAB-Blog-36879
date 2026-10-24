const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erro de validação do Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const msgs = err.errors.map(e => e.message);
    return res.status(400).json({ erro: msgs.join(', ') });
  }

  res.status(err.statusCode || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;
