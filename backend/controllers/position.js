const { GetDataPosition } = require('../models/position');
const Response = require('../helpers/response');

exports.getPosition = async (req, res, next) => {
  GetDataPosition((err, result) => {
    return res.json(Response(true, 200, 'Data Position Tersedia', result));
  });
};
