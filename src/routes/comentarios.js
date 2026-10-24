const express = require('express');
const { body } = require('express-validator');
const ctrl     = require('../controllers/comentarioController');
const { proteger } = require('../middleware/auth');
const validar  = require('../middleware/validar');

const router = express.Router({ mergeParams: true });

router.get('/',  ctrl.listar);
router.post('/', proteger,
  [body('conteudo').notEmpty().withMessage('Conteúdo obrigatório')],
  validar,
  ctrl.criar
);
router.delete('/:id', proteger, ctrl.apagar);

module.exports = router;
