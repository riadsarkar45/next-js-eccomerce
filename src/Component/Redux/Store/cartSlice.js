import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] }, // Local storage only, no database
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
