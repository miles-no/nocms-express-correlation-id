'use strict'

// Based on https://github.com/toboid/express-correlation-id

const correlator = require('correlation-id');

module.exports = (header = 'X-Correlation-ID') => {
  return (req, res, next) => {
    req.correlationId = correlator.getId;

    const id = req.get(header);
    if (id) {
      correlator.withId(id, next || {});
    } else {
      correlator.withId(next || {});
    }
  }
}

module.exports.getId = correlator.getId;
