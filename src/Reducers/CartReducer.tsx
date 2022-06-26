import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Carts = {
  Cart: string[];
  WishList: string[];
};

const initialState: Carts = {
  Cart: [],
  WishList: [],
};
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      state.Cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.Cart = state.Cart.filter((item) => action.payload !== item);
    },
    addToWishlist(state, action: PayloadAction<string>) {
      state.WishList.push(action.payload);
    },
    removeFromWishList(state, action) {
      state.WishList = state.WishList.filter((item) => action.payload !== item);
    },
  },
});
export const { addToCart, addToWishlist, removeFromCart, removeFromWishList } =
  cart.actions;
export default cart.reducer;


