import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../user/userSlice';

const getPizzaCart = () => {
  return JSON.parse(localStorage.getItem('pizzaCart'));
};

const initialState = {
  cart: getPizzaCart() || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      state.cart.push(action.payload);
    },

    increaseItemQuantity(state, action) {
      // action.patload === id
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      // action.patload === id
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // remove item from the cart if its quantity equal zero
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteCartItem(state, action);
      }
    },

    deleteCartItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    clearCart(state, action) {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    // watching for an extra action type in 'user/logout' userSlice
    builder.addCase(logout, (state, action) => {
      state.cart = [];
      localStorage.removeItem('pizzaCart');
    });
  },
});

export const {
  addCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteCartItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
