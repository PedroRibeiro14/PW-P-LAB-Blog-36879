const express = require('express');
const { body } = require('express-validator');
const ctrl     = require('../controllers/authController');
const { proteger } = require('../middleware/auth');
const validar  = require('../middleware/validar');

const router = express.Router();

router.post('/register',
  [
    body('nome').notEmpty().withMessage('Nome obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Password: mínimo 6 caracteres'),
  ],
  validar,
  ctrl.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  validar,
  ctrl.login
);

router.get('/me', proteger, ctrl.getMe);

module.exports = router;
