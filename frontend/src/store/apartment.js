import { csrfFetch } from "./csrf";

const GET_LOCAL_APTS = "apartment/getLocal";

// helper
const getLocal = (payload) => {
  return {
    type: GET_LOCAL_APTS,
    payload: payload,
  };
};

// get local action
export const getLocalApartments = (location) => async (dispatch) => {
  const { lat, lon } = location;
  const response = await csrfFetch(`/api/apartments?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  dispatch(getLocal(data));
  return data;
};

// apartment reducer
const initialState = { apartments: null };
const apartmentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LOCAL_APTS:
      newState = Object.assign({}, state);
      newState.apartments = action.payload;
      return newState;
    default:
      return state;
  }
};

export default apartmentReducer;
