import React, { useEffect, useState } from 'react';
import './index.css';
import { Button, Form, Col, Modal } from 'react-bootstrap';
import * as wrapper from '../../api';

import InputMask from "react-input-mask";

function ModalNumber(props) {
  const [value, setValue] = useState('');
  const [monthyPrice, setMonthyPrice] = useState(0);
  const [setupPrice, setSetupPrice] = useState(0);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    setValue(props.data.value);
    setMonthyPrice(props.data.monthyPrice);
    setSetupPrice(props.data.setupPrice);
    setCurrency(props.data.currency);
  }, [props.id]);

  const resetData = () => {
    setValue('');
    setMonthyPrice(0);
    setSetupPrice(0);
    setCurrency('');
  }

  const save = () => {
    let data = {
      value: value,
      monthyPrice: monthyPrice,
      setupPrice: setupPrice,
      currency: currency
    }

    wrapper.api().insert(data);
    resetData();
  }

  const edit = () => {
    let data = {
      value: value,
      monthyPrice: monthyPrice,
      setupPrice: setupPrice,
      currency: currency
    }

    wrapper.api().update(props.id, data);
    resetData();  
  }

  return(
    <Modal show={props.show}centered onHide={() => props.handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.id == null ? "Register Number" : "Edit Number"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Col>
              <Form.Group controlId="formValue">
                <Form.Label>Value</Form.Label>
                <InputMask className="form-control" mask="+99 99 99999-9999" placeholder="+99 99 99999-9999" value={value} onChange={(e) => setValue(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formMonthyPrice">
                <Form.Label>Monthy Price</Form.Label>
                <Form.Control type="number" placeholder="Monthy Price" value={monthyPrice} onChange={(e) => setMonthyPrice(e.target.value)} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="formSetupPrice">
                  <Form.Label>Setup Price</Form.Label>
                  <Form.Control type="text" placeholder="Setup Price" value={setupPrice} onChange={(e) => setSetupPrice(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCurrency">
                <Form.Label>Currency</Form.Label>
                <Form.Control type="text" placeholder="U$" value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-primary" type="submit" onClick={() => { props.id == null ? save() : edit(); props.handleClose()}}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalNumber;