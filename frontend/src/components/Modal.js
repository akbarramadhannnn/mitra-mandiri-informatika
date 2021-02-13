import { Modal, Button } from 'react-bootstrap';

const ModalComponents = ({ show, title, handleClose, text, onClick }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={onClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponents;
