import React, { Fragment, useState, useEffect } from 'react';
import FormComponents from '../components/Form';
import ModalComponents from '../components/Modal';
import axios from 'axios';

const EditKaryawan = (props) => {
  const idEmployee = props.match.params.id;
  const [name, setName] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [nip, setNip] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [message, setMessage] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  // modal
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      !name ||
      !tanggalLahir ||
      !jabatan ||
      !nip ||
      !jenisKelamin ||
      message
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [name, tanggalLahir, jabatan, nip, jenisKelamin, message]);

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios.get(
        `http://localhost:4001/employee/${idEmployee}`
      );
      if (result.data.statusCode === 200) {
        setName(result.data.result.nama_employee);
        setTanggalLahir(result.data.result.birth_date_employee);
        setJabatan(result.data.result.jabatan_id);
        setNip(result.data.result.nip_employee);
        setJenisKelamin(result.data.result.jk_employee.toString());
      }
    };
    FetchData();

    return () => {
      handleClose();
    };
  }, [idEmployee]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const onChangeTanggalLahir = (e) => {
    const value = e.target.value;
    setTanggalLahir(value);
  };

  const onChangeJabatan = (e) => {
    const value = e.target.value;
    setJabatan(value);
  };

  const onChangeNip = (e) => {
    const value = e.target.value;
    setNip(value);
    if (isNaN(value)) {
      setMessage('inputan NIP harus diisi angka');
    } else {
      setMessage('');
    }
  };

  const onChangeJenisKelamin = (e) => {
    const value = e.target.value;
    setJenisKelamin(value);
  };

  const clickSimpan = () => {
    handleShow();
  };

  const simpanEmploye = async () => {
    const data = {
      name: name,
      birth_date: tanggalLahir,
      jabatan_id: jabatan,
      nip: nip,
      jk: jenisKelamin,
    };
    const result = await axios.put(
      `http://localhost:4001/employee/update/${idEmployee}`,
      data
    );

    if (result.data.statusCode === 201) {
      props.history.push('/');
    }

    if (result.data.statusCode === 404) {
      setMessage(result.data.message);
      handleClose();
    }
  };

  return (
    <Fragment>
      <FormComponents
        textHeader="Edit Data Karyawan"
        name={name}
        tanggalLahir={tanggalLahir}
        jabatan={jabatan}
        nip={nip}
        jenisKelamin={jenisKelamin}
        onChangeName={onChangeName}
        onChangeTanggalLahir={onChangeTanggalLahir}
        onChangeJabatan={onChangeJabatan}
        onChangeNip={onChangeNip}
        onChangeJenisKelamin={onChangeJenisKelamin}
        message={message}
        onClick={clickSimpan}
        disabledButton={disabledButton}
      />
      <ModalComponents
        show={show}
        title="Konfirmasi"
        handleClose={handleClose}
        text="Apakah anda akan menyimpan data ini ?"
        onClick={simpanEmploye}
      />
    </Fragment>
  );
};

export default EditKaryawan;
