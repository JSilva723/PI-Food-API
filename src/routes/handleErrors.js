const ERRORS = {
  // Attr type uuid
  SequelizeDatabaseError: (res, err) => res.status(406).json({status: 406, data: err.errors[0].message}),
  // Unique attr
  SequelizeUniqueConstraintError: (res, err) => res.status(406).json({status: 406, data: err.errors[0].message}),
  // Not null attrs
  SequelizeValidationError: (res, err) => res.status(406).json({status: 406, data: err.errors[0].message}),
  // Not Found
  Error: (res, err) => res.status(404).json({status: 404, data: 'not found'}) // eslint-disable-line
};

module.exports = (err, req, res, next) => { // eslint-disable-line
  // eslint-disable-next-line no-prototype-builtins
  if (!ERRORS.hasOwnProperty(err.name)) {
    console.error('This error not handled', err) // eslint-disable-line 
    return res.status(500).json({status: 500, data: 'Internal Error'});
  }
  return ERRORS[err.name](res, err);
};
