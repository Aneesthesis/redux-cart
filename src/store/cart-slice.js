import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => newItem.id === item.id);
      if (!existingItem) {
        state.items.push({
          name: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
          id: newItem.id,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalQuantity++;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const decreasedItem = state.items.find((item) => item.id === id);
      if (decreasedItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        decreasedItem.quantity--;
        decreasedItem.totalPrice =
          decreasedItem.totalPrice - decreasedItem.price;
      }
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
