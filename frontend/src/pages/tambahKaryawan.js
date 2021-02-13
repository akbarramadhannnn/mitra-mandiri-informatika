import React, { Fragment, useState, useEffect } from 'react';
import FormComponents from '../components/Form';
import ModalComponents from '../components/Modal';
import axios from 'axios';

const TambahKaryawan = (props) => {
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
    return () => {
      handleClose();
    };
  }, []);

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
    const result = await axios.post(
      'http://localhost:4001/employee/create',
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
        textHeader="Add Data Karyawan"
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

export default TambahKaryawan;
