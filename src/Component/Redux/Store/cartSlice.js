import useAxiosPublic from "@/Component/Hooks/UseAxiosPublic";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  const cartData = localStorage.getItem("cart");
  if (!cartData) return [];

  return JSON.parse(localStorage.getItem("cart")) || [];

};


export const syncCartToDB = createAsyncThunk(
  "cart/syncCartToDB",
  async (userId, { getState }) => {
    try {
      const axiosPublic = useAxiosPublic();

      const { cartItems } = getState().cart;
      
      const sync = await axiosPublic.post(`/api/syncCartItem/${userId}`, { userId, cart: cartItems });
      console.log(sync.data);
      if (sync?.data?.msg === 'ok') {
        localStorage.removeItem("cart");

      }
      return { success: true };
    } catch (error) {
      console.error("Error syncing cart:", error);
      return { success: false };
    }
  }
);


const cartSlice = createSlice({

  name: "cart",
  initialState: { cartItems: loadCartFromStorage() },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, productImg, title, price } = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity, productImg, title, price });
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
