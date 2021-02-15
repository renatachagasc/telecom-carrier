import NumbersTypes from './types'

const INITIAL_STATE = {
  data: [
    {
      id: 42,
      value: "+55 84 91234-4321",
      monthyPrice: "0.03",
      setupPrice: "3.40",
      currency: "U$"
    }
  ],
  error: false,
  loading: false
};

function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
    case NumbersTypes.LOAD_REQUEST:
        return { ...state, loading: true };
    case NumbersTypes.LOAD_SUCCESS:
        return { ...state, loading: false, error: false, data: action.payload };
    case NumbersTypes.LOAD_FAILURE:
        return { ...state, loading: false, error: true, data: {} };
    default:
        return state;
  }
}

export default reducer;
