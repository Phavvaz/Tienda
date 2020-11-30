import * as actionTypes from '../actionCreators/actionTypes';

// PRODUCT LIST
const initialStateA = {
  loading: false,
  pages: 1,
  page: 1,
  products: [],
  error: null,
};

const productListReducer = (state = initialStateA, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.pages,
        page: action.page,
        products: action.products,
      };
    case actionTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const initialStateB = {
  loading: false,
  product: { reviews: [] },
  error: null,
};

const productDetailsReducer = (state = initialStateB, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.productDetails,
        //   reviews: state.product.reviews.concat(action.reviews),
      };
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const initialStateC = {
  loading: false,
  product: {},
  success: false,
  error: null,
};
const productCreateReducer = (state = initialStateC, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.data,
      };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case actionTypes.PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

const initialStateD = {
  loading: false,
  updatedProduct: {},
  success: false,
  error: null,
};
const productUpdateReducer = (state = initialStateD, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedProduct: action.data,
      };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case actionTypes.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

const productTopReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_TOP_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case actionTypes.PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.data,
      };
    case actionTypes.PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopReducer,
};
