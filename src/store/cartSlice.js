import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const findIndex = (items, productId) => items.findIndex((item) => item.id === productId);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const idx = findIndex(state.items, item.id);
      if (idx !== -1) {
        if (state.items[idx].quantity < state.items[idx].stock) {
          state.items[idx].quantity += 1;
        }
      } else {
        if (item.quantity > 0) {
          state.items.push({ ...item, quantity: 1, stock: item.quantity });
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const idx = findIndex(state.items, id);
      if (idx !== -1) {
        if (quantity <= 0) {
          state.items.splice(idx, 1);
        } else if (quantity <= state.items[idx].stock) {
          state.items[idx].quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
