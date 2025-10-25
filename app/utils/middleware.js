const Joi = require('joi');

const productSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  cantidad: Joi.number().integer().min(1).required(),
  precio: Joi.number().positive().required(),
  descripcion: Joi.string().max(255).allow('', null),
  activo: Joi.boolean().required()
});

const validarProducto = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      mensaje: "Datos inválidos",
      errores: error.details.map((e) => e.message),
    });
  }

  next();
};

module.exports = { validarProducto };
