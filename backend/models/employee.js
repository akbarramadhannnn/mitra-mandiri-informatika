const sql = require('../config/connection');
// const connect = connection();
exports.GetDataEmployee = (result) => {
  // WHERE IS_DELETE = 0
  sql.query(
    'SELECT * FROM employee INNER JOIN jabatan ON jabatan.id_jabatan = employee.jabatan_id and employee.is_delete_employee = 0 ',
    (err, res) => {
      result(null, res);
    }
  );
};

exports.CreateDataEmployee = (employee, result) => {
  sql.query('INSERT INTO employee set ?', employee, (err, res) => {
    result(null, res.insertId);
  });
};

exports.DeleteDataEmployee = (id, result) => {
  sql.query(
    'UPDATE employee SET is_delete_employee=? WHERE id_employee = ?',
    [1, id],
    (err, res) => {
      result(null, res);
    }
  );
};

exports.UpdateDataEmployee = (id, employee, result) => {
  sql.query(
    'UPDATE employee SET nama_employee=?,birth_date_employee=?,jabatan_id=?,nip_employee=?,jk_employee=? WHERE id_employee = ?',
    [
      employee.nama_employee,
      employee.birth_date_employee,
      employee.jabatan_id,
      employee.nip_employee,
      employee.jk_employee,
      id,
    ],
    (err, res) => {
      result(null, res);
    }
  );
};

exports.GetDataEmployeeByNip = (nip, result) => {
  sql.query(
    `SELECT * FROM employee WHERE nip_employee = ${nip}`,
    (err, res) => {
      result(null, res);
    }
  );
};

exports.GetDataEmployeeById = (id, result) => {
  sql.query(`SELECT * FROM employee WHERE id_employee = ${id}`, (err, res) => {
    result(null, res);
  });
};

exports.GetDataEmployeeByIdAndNip = (id, nip, result) => {
  sql.query(
    `SELECT * FROM employee WHERE nip_employee = ${nip} and id_employee != ${id}`,
    (err, res) => {
      result(null, res);
    }
  );
};
