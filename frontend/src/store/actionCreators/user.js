import axios from 'axios';
import * as actionTypes from './actionTypes';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');

  dispatch({
    type: actionTypes.USER_LOGOUT,
  });

  dispatch({
    type: actionTypes.USER_REGISTER_RESET,
  });

  dispatch({
    type: actionTypes.USER_DETAILS_RESET,
  });

  dispatch({
    type: actionTypes.USER_UPDATE_PROFILE_RESET,
  });

  dispatch({
    type: actionTypes.USER_LIST_RESET,
  });

  dispatch({
    type: actionTypes.USER_UPDATE_RESET,
  });

  dispatch({
    type: actionTypes.MY_ORDERS_LIST_RESET,
  });

  dispatch({
    type: actionTypes.ORDERS_LIST_RESET,
  });

  dispatch({
    type: actionTypes.ORDER_DELIVER_RESET,
  });

  dispatch({
    type: actionTypes.PRODUCT_CREATE_RESET,
  });

  dispatch({
    type: actionTypes.PRODUCT_UPDATE_RESET,
  });

  dispatch({
    type: actionTypes.PRODUCT_CREATE_REVIEW_RESET,
  });
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      data,
    });

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/users', config);

    // console.log(data);

    dispatch({
      type: actionTypes.USER_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LIST_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
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
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.delete(`/api/users/${userId}`, config);

    // console.log(res);

    dispatch({
      type: actionTypes.USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DELETE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: actionTypes.USER_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
