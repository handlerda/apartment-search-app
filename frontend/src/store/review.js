import { csrfFetch } from "./csrf";

const GET_APT_REVIEWS = "review/getReview";
const ADD_APT_REVIEWS = "review/addReview";

// helper
const getReview = (payload) => {
  return {
    type: GET_APT_REVIEWS,
    payload,
  };
};

const addReview = (payload) => {
  return {
    type: ADD_APT_REVIEWS,
    payload,
  };
};

export const addNewReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/`, {
    method: "POST",
    body: JSON.stringify({
      payload,
    }),
  });
  const data = await response.json();
  console.log(`here comes the data`);
  dispatch(addReview(data));
  return data;
};

// reviews reducer
const initialState = { REVIEWS: null };
const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_APT_REVIEWS:
      newState = Object.assign({}, state);
      newState.internalReview = action.payload;
      return newState;
    case ADD_APT_REVIEWS:
      newState = Object.assign({}, state);
      newState.addInternalReview = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
