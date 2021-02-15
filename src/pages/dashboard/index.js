import React, { useEffect, useState } from 'react';
import './index.css';

import ModalNumber from '../../components/modalNumber';

import * as NumbersActions from '../../store/ducks/numbers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button,  Container, Row, Col, Card } from 'react-bootstrap';

import "react-circular-progressbar/dist/styles.css";

import * as wrapper from '../../api';
import PaginationCustom from './components/pagination';
import ProgressCustom from './components/progress';
import TableCustom from './components/table';

function Dashboard(props) {
  const [page, setPage] = useState(1);
  const [idEdit, setIdEdit] = useState(0);
  const [dataEdit, setDataEdit] = useState({
    value: '',
    monthyPrice: 0,
    setupPrice: 0,
    currency: '',
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    wrapper.api().get();
  }, []);

  return (
    <Container fluid className="p-5">
      <Row>
        <Col sm={4} lg={2} className="order-2 order-sm-1">
          <Card>
            <Card.Body>
              <Card.Text>Available Numbers</Card.Text>
              <ProgressCustom />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={10} className="order-1 order-sm-2">
          <Row className="d-flex justify-content-start pb-3 mt-2">
            <Button className="plus ml-3" onClick={() => {
              setDataEdit({
                value: '',
                monthyPrice: 0,
                setupPrice: 0,
                currency: ''
              });
              setIdEdit(null);
              handleShow();
            }}>
              <FontAwesomeIcon className="mr-2" size="1x" icon={faPlus} /> Add New Register
          </Button>
          </Row>

          <TableCustom currentPage={page} />

          <Row className="d-flex justify-content-start mt-3">
            <Col lg={2}>
              <PaginationCustom currentPage={page} onChange={(value) => { setPage(value) }} />
            </Col>
          </Row>
        </Col>
      </Row>

      <ModalNumber id={idEdit} data={dataEdit} show={show} handleClose={handleClose} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  numbers: state.numbers
});

const mapDispatchProps = (dispatch) => bindActionCreators(NumbersActions, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Dashboard);
