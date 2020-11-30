import axios from 'axios';
import * as actionTypes from './actionTypes';

export const listProducts = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/products?pageNumber=${pageNumber}`);
    const { products, page, pages } = data;
    // console.log(data);

    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      products,
      page,
      pages,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${productId}`, config);
    // console.log(res);

    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/products', product, config);
    // console.log(data);

    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
      data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    // console.log(data);

    dispatch({
      type: actionTypes.PRODUCT_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewProduct = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const topRatedProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_TOP_REQUEST,
    });

    const { data } = await axios.get('/api/products/top');
    // console.log(data);

    dispatch({
      type: actionTypes.PRODUCT_TOP_SUCCESS,
      data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_TOP_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
