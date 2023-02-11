import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchedData = async () => {
      const response = await fetch(
        "https://react-http-35719-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("could not fetch cart data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const cartData = await fetchedData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error!",
          message: "could not send cart data!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "updating cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-35719-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "sucessfull!",
          message: "updated cart data!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error!",
          message: "snap! could not update cart data!",
        })
      );
    }
  };
};
