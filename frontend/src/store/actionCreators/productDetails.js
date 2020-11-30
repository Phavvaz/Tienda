import axios from 'axios';
import * as actionTypes from './actionTypes';

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_REQUEST,
    });

    const res = await axios.get(`/api/products/${id}`);
    // console.log(res);

    dispatch({
      type: actionTypes.PRODUCT_DETAILS_SUCCESS,
      productDetails: res.data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_FAIL,
      err:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
