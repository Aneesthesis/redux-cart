import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData } from "./store/cart-actions";
import { sendCartData } from "./store/cart-actions";

let initialRun = true;

function App() {
  const [notifIsShown, setNotiIsShown] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { notification } = useSelector((state) => state.ui);
  const { showCart } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (initialRun) {
      initialRun = false;
      return;
    }
    if (cart.changed) {
      setNotiIsShown(true);
      dispatch(
        //not sending the entire cart object bcz it would include the "changed" field as well.
        sendCartData({ items: cart.items, totalQuantity: cart.totalQuantity })
      );
    }
  }, [cart]);

  useEffect(() => {}, []);

  return (
    <Fragment>
      {notification && (
        <Notification
          setIsShown={setNotiIsShown}
          isShown={notifIsShown}
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
