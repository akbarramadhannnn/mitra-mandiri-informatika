import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Button, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const FormComponents = ({
  textHeader,
  name,
  onChangeName,
  tanggalLahir,
  onChangeTanggalLahir,
  jabatan,
  onChangeJabatan,
  nip,
  onChangeNip,
  jenisKelamin,
  onChangeJenisKelamin,
  message,
  onClick,
  disabledButton,
}) => {
  const [dataJabatan, setDataJabatan] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios.get('http://localhost:4001/position');
      if (result.data.statusCode === 200) {
        setDataJabatan(result.data.result);
      }

      if (result.data.statusCode === 204) {
        setDataJabatan([]);
      }
    };
    FetchData();
  }, []);

  return (
    <Card>
      <Card.Header>{textHeader}</Card.Header>
      <Card.Body>
        {message && <Alert variant="danger">{message}</Alert>}

        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Nama
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="nama karyawan"
                onChange={onChangeName}
                value={name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Tanggal Lahir
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                value={tanggalLahir}
                onChange={onChangeTanggalLahir}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Jabatan
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={jabatan}
                onChange={onChangeJabatan}
              >
                <option value="">== Pilih Jabatan ==</option>
                {dataJabatan.map((d, i) => {
                  return (
                    <option key={i} value={d.id_jabatan}>
                      {d.nama_jabatan}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              NIP
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" onChange={onChangeNip} value={nip} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Jenis Kelamin
            </Form.Label>
            <Col sm="10" className="pt-2">
              <Row>
                <Col sm="auto">
                  <Form.Check
                    type="radio"
                    label="Pria"
                    value="1"
                    checked={jenisKelamin === '1'}
                    onChange={onChangeJenisKelamin}
                  />
                </Col>

                <Col sm="auto">
                  <Form.Check
                    type="radio"
                    label="Wanita"
                    value="2"
                    checked={jenisKelamin === '2'}
                    onChange={onChangeJenisKelamin}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>
        </Form>

        <Row>
          <Col md="6" className="text-right">
            <Link to="/" className="btn btn-warning">
              Kembali
            </Link>
          </Col>
          <Col md="6" className="text-left">
            <Button onClick={onClick} disabled={disabledButton}>
              Simpan
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FormComponents;
