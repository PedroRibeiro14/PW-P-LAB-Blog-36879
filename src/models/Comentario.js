const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Utilizador    = require('./Utilizador');
const Artigo        = require('./Artigo');

const Comentario = sequelize.define('Comentario', {
  conteudo: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

Comentario.belongsTo(Utilizador, { as: 'autor',  foreignKey: 'autorId' });
Comentario.belongsTo(Artigo,     { as: 'artigo', foreignKey: 'artigoId' });
Utilizador.hasMany(Comentario,   { foreignKey: 'autorId' });
Artigo.hasMany(Comentario,       { foreignKey: 'artigoId' });

module.exports = Comentario;
