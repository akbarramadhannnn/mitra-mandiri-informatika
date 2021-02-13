const {
  GetDataEmployee,
  CreateDataEmployee,
  DeleteDataEmployee,
  UpdateDataEmployee,
  GetDataEmployeeByNip,
  GetDataEmployeeById,
  GetDataEmployeeByIdAndNip,
} = require('../models/employee');
const Response = require('../helpers/response');
const moment = require('moment');

exports.getEmployee = (req, res, next) => {
  GetDataEmployee((err, result) => {
    if (!result.length) {
      return res.json(Response(true, 204, 'Data Employee Belum Tersedia', {}));
    }

    const data = [];
    for (let i = 0; i < result.length; i++) {
      data.push({
        idEmployee: result[i].id_employee,
        nama: result[i].nama_employee,
        tanggalLahir: moment(result[i].birth_date_employee).format(
          'DD MMMM YYYY'
        ),
        jabatan: result[i].nama_jabatan,
        nip: result[i].nip_employee,
        jenisKelamin: result[i].jk_employee === 1 ? 'Pria' : 'Wanita',
      });
    }

    return res.json(Response(true, 200, 'Data Employee Tersedia', data));
  });
};

exports.createEmployee = (req, res, next) => {
  const { name, birth_date, jabatan_id, nip, jk } = req.body;

  GetDataEmployeeByNip(nip, (err, resultNip) => {
    if (resultNip.length) {
      return res.json(Response(true, 404, 'Nip Employee Sudah Tersedia', {}));
    }

    const payload = {
      nama_employee: name,
      birth_date_employee: birth_date,
      jabatan_id,
      nip_employee: nip,
      jk_employee: jk,
      is_delete_employee: 0,
    };

    CreateDataEmployee(payload, (err, result) => {
      return res.json(
        Response(true, 201, 'Employee Berhasil di Tambahkan', {})
      );
    });
  });
};

exports.deleteEmployee = (req, res, next) => {
  const { id } = req.params;
  DeleteDataEmployee(id, (err, result) => {
    return res.json(Response(true, 200, 'Employee Berhasil di Hapus', {}));
  });
};

exports.updateEmployee = (req, res, next) => {
  const { id } = req.params;
  const { name, birth_date, jabatan_id, nip, jk } = req.body;

  const payload = {
    nama_employee: name,
    birth_date_employee: birth_date,
    jabatan_id,
    nip_employee: nip,
    jk_employee: jk,
  };
  GetDataEmployeeByIdAndNip(id, nip, (err, resultNip) => {
    if (resultNip.length) {
      return res.json(Response(true, 404, 'Nip Employee Sudah Tersedia', {}));
    }

    UpdateDataEmployee(id, payload, (err, result) => {
      return res.json(Response(true, 201, 'Employee Berhasil di Update', {}));
    });
  });
};

exports.getEmployeeById = (req, res, next) => {
  const { id } = req.params;

  GetDataEmployeeById(id, (err, result) => {
    result[0].birth_date_employee = moment(
      result[0].birth_date_employee
    ).format('YYYY-MM-DD');
    return res.json(Response(true, 200, 'Data Employee Tersedia', result[0]));
  });
};
