import React from 'react';
import './index.css';
import { Button, Modal } from 'react-bootstrap';
import * as wrapper from '../../api';

function ModalConfirm(props) {
  const del = (id) => {
    wrapper.api().del(id);
  }

  return(
    <Modal show={props.show} centered onHide={() => props.handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
        <p>Do you really want delete this register?</p>
      </Modal.Body>
    
      <Modal.Footer>
        <Button variant="danger" onClick={() => { del(props.id); props.handleClose(); }}>Yes</Button>
        <Button variant="primary" onClick={() => props.handleClose()}>No</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm;