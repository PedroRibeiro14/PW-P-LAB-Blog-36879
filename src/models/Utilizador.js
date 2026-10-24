const { DataTypes } = require('sequelize');
const bcrypt        = require('bcryptjs');
const { sequelize } = require('../config/db');

const Utilizador = sequelize.define('Utilizador', {
  nome:     { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role:     { type: DataTypes.ENUM('autor', 'admin'), defaultValue: 'autor' },
}, { timestamps: true });

Utilizador.beforeSave(async (utilizador) => {
  if (utilizador.changed('password')) {
    utilizador.password = await bcrypt.hash(utilizador.password, 12);
  }
});

Utilizador.prototype.compararPassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = Utilizador;
