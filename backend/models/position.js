const sql = require('../config/connection');
// const connect = connection();
exports.GetDataPosition = (result) => {
  sql.query('SELECT * FROM jabatan WHERE is_delete_jabatan = 0', (err, res) => {
    result(null, res);
  });
};
