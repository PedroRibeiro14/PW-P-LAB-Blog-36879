const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Utilizador    = require('./Utilizador');

const Artigo = sequelize.define('Artigo', {
  titulo:    { type: DataTypes.STRING,  allowNull: false },
  conteudo:  { type: DataTypes.TEXT,    allowNull: false },
  categoria: { type: DataTypes.ENUM('tecnologia', 'ciência', 'desporto', 'cultura', 'outro'), allowNull: false },
  publicado: { type: DataTypes.BOOLEAN, defaultValue: false },
  imagem:    { type: DataTypes.STRING },
}, { timestamps: true });

Artigo.belongsTo(Utilizador, { as: 'autor', foreignKey: 'autorId' });
Utilizador.hasMany(Artigo,   { foreignKey: 'autorId' });

module.exports = Artigo;
