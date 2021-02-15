import NumbersTypes from './types';

export const loadRequest = () => { return { type: NumbersTypes.LOAD_REQUEST, payload: {} } };

export const loadSuccess = (data) => { return { type: NumbersTypes.LOAD_SUCCESS, payload: data } };

export const loadFailure = () => { return { type: NumbersTypes.LOAD_FAILURE, payload: {} } };