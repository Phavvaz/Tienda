import * as actionTypes from '../actionCreators/actionTypes';

const initialStateA = {
  loading: false,
  order: null,
  success: false,
  error: null,
};

const orderCreateReducer = (state = initialStateA, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.data,
      };
    case actionTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const initialStateB = {
  loading: true,
  success: false,
  order: null,
  error: null,
};

const orderDetailsReducer = (state = initialStateB, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.details,
      };
    case actionTypes.ORDER_DETAILS_FAIL:
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

const initialStateC = {
  loading: false,
  success: false,
  updatedOrder: {},
  error: null,
};

const OrderPayReducer = (state = initialStateC, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        updatedOrder: action.updatedOrder,
      };
    case actionTypes.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

const initialStateD = {
  loading: false,
  orders: [],
  error: null,
};

const MyOrdersListReducer = (state = initialStateD, action) => {
  switch (action.type) {
    case actionTypes.MY_ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.MY_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.MY_ORDERS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.MY_ORDERS_LIST_RESET:
      return {};

    default:
      return state;
  }
};

const initialStateE = {
  loading: false,
  orders: [],
  error: null,
};

const ordersListReducer = (state = initialStateE, action) => {
  switch (action.type) {
    case actionTypes.ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.ORDERS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.ORDERS_LIST_RESET:
      return {};

    default:
      return state;
  }
};

const initialStateF = {
  loading: false,
  success: false,
  updatedOrder: {},
  error: null,
};

const OrderDeliverReducer = (state = initialStateF, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        updatedOrder: action.deliveredOrder,
      };
    case actionTypes.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export {
  orderCreateReducer,
  orderDetailsReducer,
  OrderPayReducer,
  MyOrdersListReducer,
  ordersListReducer,
  OrderDeliverReducer,
};
