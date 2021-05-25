import { csrfFetch } from "./csrf";

const GET_LOCAL_APTS = "apartment/getLocal";
const GET_APT_DETAIL = "apartment/getDetail";
const ADD_INTERESTED_APT = "apartment/addInterested";
const DELETE_INTERESTED_APT = "apartment/deleteInterested";

// helper
const getLocal = (payload) => {
  return {
    type: GET_LOCAL_APTS,
    payload,
  };
};

const getDetail = (payload) => {
  return {
    type: GET_APT_DETAIL,
    payload,
  };
};

const addIntrested = (payload) => {
  return {
    type: ADD_INTERESTED_APT,
    payload,
  };
};
const deleteInterested = (payload) => {
  return {
    type: DELETE_INTERESTED_APT,
    payload,
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

export const getApartmentDetails = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/apartments/${id}`);
  const data = await response.json();
  dispatch(getDetail(data));
  return data;
};

export const addInterestedApartment = (aptId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/apartments/${aptId}/interested`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      aptId,
    }),
  });
  const data = await response.json();
  dispatch(addIntrested(data));
  return data;
};

export const deleteInterestedApartment =
  (aptId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/apartments/${aptId}/interested`, {
      method: "DELETE",
      body: JSON.stringify({
        userId,
        aptId,
      }),
    });
    const data = await response.json();
    dispatch(deleteInterested(data));
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
    case GET_APT_DETAIL:
      newState = Object.assign({}, state);
      newState.apartmentDetail = action.payload;
      return newState;
    case ADD_INTERESTED_APT:
      newState = Object.assign({}, state);
      newState.interestedApt = action.payload;
      return newState;
    case DELETE_INTERESTED_APT:
      newState = Object.assign({}, state);
      newState.interestedAptDeleted = action.payload;
      return newState;
    default:
      return state;
  }
};

export default apartmentReducer;
