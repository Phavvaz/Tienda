import axios from 'axios';
import * as actionTypes from './actionTypes';

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {
      data: { createdOrder },
    } = await axios.post('/api/orders', order, config);
    // console.log(createdOrder);

    dispatch({
      type: actionTypes.ORDER_CREATE_SUCCESS,
      data: createdOrder,
    });

    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_CREATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    // console.log(data);

    dispatch({
      type: actionTypes.ORDER_DETAILS_SUCCESS,
      details: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DETAILS_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDER_PAY_REQUEST });

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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    // console.log(data);

    dispatch({
      type: actionTypes.ORDER_PAY_SUCCESS,
      updatedOrder: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_PAY_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const myOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.MY_ORDERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/orders/myorders', config);
    // console.log(data);

    dispatch({
      type: actionTypes.MY_ORDERS_LIST_SUCCESS,
      orders: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.MY_ORDERS_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const ordersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/orders', config);

    dispatch({
      type: actionTypes.ORDERS_LIST_SUCCESS,
      orders: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDERS_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const orderDeliver = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDER_DELIVER_REQUEST });

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
      `/api/orders/${orderId}/deliver`,
      {},
      config
    );
    // console.log(data);

    dispatch({
      type: actionTypes.ORDER_DELIVER_SUCCESS,
      deliveredOrder: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DELIVER_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  createOrder,
  getOrderDetails,
  payOrder,
  myOrdersList,
  ordersList,
  orderDeliver,
};
