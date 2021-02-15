import React from 'react';
import { Pagination } from 'react-bootstrap';

import * as NumbersActions from '../../../store/ducks/numbers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function PaginationCustom(props) {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.numbers.data.length / 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <small>
        Total {props.numbers.data.length}
      </small>

      { pageNumbers.length >= 1 ?
        <Pagination>
          <li className="page-item">
            <a className="page-link" onClick={() => { props.currentPage !== 1 ? props.onChange(props.currentPage-1) : props.onChange(props.currentPage); }}>Previous</a>
          </li>
          {pageNumbers.map(num => (
            <li className={props.currentPage === num ? "page-item active" : "page-item"} key={num}>
              <a onClick={() => { props.onChange(num); }} className="page-link" >{num}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" onClick={() => { props.currentPage !== pageNumbers[pageNumbers.length - 1] ? props.onChange(props.currentPage+1) : props.onChange(props.currentPage); }}>Next</a>
          </li>
        </Pagination>
        :
        []
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  numbers: state.numbers
});

const mapDispatchProps = (dispatch) => bindActionCreators(NumbersActions, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(PaginationCustom);
