const ERRORS = {
  // Attr type uuid
  SequelizeDatabaseError: (res, err) => res.status(406).json(err),
  // Unique attr
  SequelizeUniqueConstraintError: (res, err) => res.status(406).json(err),
  // Not null attrs
  SequelizeValidationError: (res, err) => res.status(406).json(err),
  Error: (res, err) => res.status(404).json('not found') // eslint-disable-line
};

module.exports = (err, req, res, next) => { // eslint-disable-line
  // eslint-disable-next-line no-prototype-builtins
  if (!ERRORS.hasOwnProperty(err.name)) {
    console.error('This error not handled', err) // eslint-disable-line 
    return res.status(500).json('UPS');
  }
  return ERRORS[err.name](res, err);
};
