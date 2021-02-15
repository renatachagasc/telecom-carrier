import React, { useEffect, useState } from 'react';
import '../index.css';

import ModalNumber from '../../../components/modalNumber';
import ModalConfirm from '../../../components/modalConfirm';

import * as NumbersActions from '../../../store/ducks/numbers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner, Table } from 'react-bootstrap';

import "react-circular-progressbar/dist/styles.css";

import * as wrapper from '../../../api';

function TableCustom(props) {
    const [idEdit, setIdEdit] = useState(0);
    const [dataEdit, setDataEdit] = useState({
        value: '',
        monthyPrice: 0,
        setupPrice: 0,
        currency: '',
    });

    const [idDelete, setIdDelete] = useState(0);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    useEffect(() => {
        
        wrapper.api().get();
    }, []);

    return (

        <div className="number-table">
            <p className="card-text p-3">Available Numbers</p>
            {props.numbers.loading ?
                <Spinner animation="border" role="status" variant={'primary'}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <Table striped responsive hover className="d-md-table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Value</th>
                            <th scope="col">Monthy Price</th>
                            <th scope="col">Setup Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {props.numbers != null && props.numbers.data.length >= 1 ? props.numbers.data.slice(2 * props.currentPage - 2, 2 * props.currentPage).map((number) =>
                            <tr key={number.id}>
                                <th scope="row">{number.id}</th>
                                <td>{number.value}</td>
                                <td>{`${number.currency} ${number.monthyPrice}`}</td>
                                <td>{`${number.currency} ${number.setupPrice}`}</td>
                                <td>
                                    <Button className="action mr-2" onClick={() => {
                                        setDataEdit({
                                            value: number.value,
                                            monthyPrice: number.monthyPrice,
                                            setupPrice: number.setupPrice,
                                            currency: number.currency
                                        });
                                        setIdEdit(number.id);
                                        handleShow();
                                    }}>
                                        <FontAwesomeIcon size="1x" icon={faPencilAlt} />
                                    </Button>
                                    <Button className="btn btn-danger action" type="submit" onClick={() => { setIdDelete(number.id); handleShowConfirm() }}>
                                        <FontAwesomeIcon size="1x" icon={faTimes} />
                                    </Button>
                                </td>
                            </tr>

                        ) : <tr>
                            <td colSpan="5"><p>No data</p></td>
                        </tr>
                        
                        }
                    </tbody>
                </Table>
            }
            <ModalNumber id={idEdit} data={dataEdit} show={show} handleClose={handleClose} />
            <ModalConfirm id={idDelete} show={showConfirm} handleClose={handleCloseConfirm} />
        </div>

    );
}

const mapStateToProps = (state) => ({
    numbers: state.numbers
});

const mapDispatchProps = (dispatch) => bindActionCreators(NumbersActions, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(TableCustom);
