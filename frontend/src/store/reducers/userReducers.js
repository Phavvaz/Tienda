import * as actionTypes from '../actionCreators/actionTypes';

const userDetailsFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialStateA = {
  loading: false,
  userInfo: userDetailsFromStorage,
  error: null,
};

const userLoginReducer = (state = initialStateA, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.data,
        error: null,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: null,
      };
    default:
      return state;
  }
};

const initialStateB = {
  loading: false,
  userInfo: {},
  error: null,
};

const userRegisterReducer = (state = initialStateB, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.data,
        error: null,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

const initialStateC = {
  loading: false,
  user: {},
  error: null,
};

const userDetailsReducer = (state = initialStateC, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
        error: null,
      };
    case actionTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.USER_DETAILS_RESET:
      return {
        ...state,
        user: {},
        error: null,
      };
    default:
      return state;
  }
};

const initialStateD = {
  loading: false,
  success: false,
  userInfo: {},
  error: null,
};

const updateUserProfileReducer = (state = initialStateD, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.data,
        error: null,
      };
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        userInfo: {},
        error: null,
        success: false,
      };
    default:
      return state;
  }
};

const initialStateE = {
  loading: false,
  users: [],
  error: null,
};

const userListReducer = (state = initialStateE, action) => {
  switch (action.type) {
    case actionTypes.USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.data,
        error: null,
      };
    case actionTypes.USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.USER_LIST_RESET:
      return {
        ...state,
        users: [],
        error: null,
      };
    default:
      return state;
  }
};

const userDeleteReducer = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case actionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case actionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const initialStateF = {
  loading: false,
  success: false,
  userInfo: {},
  error: null,
};

const userUpdateReducer = (state = initialStateF, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case actionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.data,
        error: null,
      };
    case actionTypes.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.USER_UPDATE_RESET:
      return {
        ...state,
        userInfo: {},
        error: null,
        success: false,
      };
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
};
