const MasanaGelsinReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_INIT":
      return {
        ...state,
        isLoggedIn: false,
        isError: false,
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
      case "ADD_COMMENT_FAILURE":
        return {
          ...state,
          isSuccess: false,
          isError:true
        };
    case "ADD_ORDER_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
      case "ADD_ORDER_FAILURE":
        return {
          ...state,
          isSuccess: false,
          isError:true
        };
    case "ADD_PAYMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
      case "ADD_PAYMENT_FAILURE":
        return {
          ...state,
          isSuccess: false,
          isError:true
        };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
    case "ADD_PRODUCT_FAILURE":
      return {
        ...state,
        isSuccess: false,
      };
    case "ADD_HOME_VALUE_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
    case "ADD_HOME_VALUE_FAILURE":
      return {
        ...state,
        isSuccess: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isError: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        isError: true,
      };
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isLoggedIn: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: true,
      };
    case "REMOVE_PRODUCT":
      console.log(action.payload);
      return {
        ...state,
        data: state.data.filter((P) => action.payload._id !== P._id),
        isDeleted:true
      };
    default:
      throw new Error("Hata");
  }
};
export default MasanaGelsinReducer;
