import React, { Fragment, useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import ModalComponents from '../components/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Karyawan = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    const result = await axios.get('http://localhost:4001/employee');
    if (result.data.statusCode === 200) {
      setData(result.data.result);
    }

    if (result.data.statusCode === 204) {
      setData([]);
    }
  };

  const handleClose = () => {
    setShow(false);
    setId('');
  };

  const handleShow = () => setShow(true);

  const klikHapus = (id) => {
    handleShow();
    setId(id);
  };

  const hapusEmployee = async () => {
    const result = await axios.delete(
      `http://localhost:4001/employee/delete/${id}`
    );
    if (result.data.statusCode === 200) {
      FetchData();
      handleClose();
    }
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>List Karyawan</Card.Header>
        <Card.Body>
          <div className="mb-sm-4">
            <Link to="/add" className="btn btn-primary">
              Tambah
            </Link>
          </div>

          <Table striped bordered hover className="table-fixed">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Tanggal Lahir</th>
                <th>Jabatan</th>
                <th>NIP</th>
                <th>Jenis Kelamin</th>
                <th>Aksi</th>
              </tr>
            </thead>

            {data.map((d, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{d.nama}</td>
                    <td>{d.tanggalLahir}</td>
                    <td>{d.jabatan}</td>
                    <td>{d.nip}</td>
                    <td>{d.jenisKelamin}</td>
                    <td>
                      <Link
                        to={`/update/${d.idEmployee}`}
                        className="m-1 btn btn-warning"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>{' '}
                      <Button
                        className="m-1 btn-danger"
                        onClick={() => klikHapus(d.idEmployee)}
                      >
                        <i className="fa fa-trash-alt"></i>
                      </Button>{' '}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Card.Body>
      </Card>

      <ModalComponents
        show={show}
        title="Konfirmasi"
        handleClose={handleClose}
        text="Apakah anda akan menghapus data ini ?"
        onClick={hapusEmployee}
      />
    </Fragment>
  );
};

export default Karyawan;
