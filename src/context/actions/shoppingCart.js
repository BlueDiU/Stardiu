import { TYPES } from '../types/types';

import { api_enpoint } from '../../helpers/helpApi';
import { helpHttp } from '../../helpers/helpHttp';

import { toast } from 'react-toastify';

// instance for http helper
const api = helpHttp();

/* ----- SHOPPING CART SECTION ----- */

/**
 *
 * @param {{userId}} userId user id when has been logged
 */
export const startGetShoppingCart = (userId) => {
  return async (dispatch) => {
    try {
      console.log(userId);
      //const res = await api.post(api_enpoint.getShoppingCart);
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 *
 * @param {{userId}} userId user id
 */
export const startCountProducts = (userId) => {
  return async (dispatch) => {
    try {
      const res = await api.get(
        `${api_enpoint.countShoppingCart}/${userId}`
      );

      dispatch(countProducts(res.total));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 *
 * @param {{userId: string, productId: string, quanitity: number}} data
 * @returns
 */
export const startAddToCart = (cartData) => {
  return async (dispatch) => {
    try {
      let data = {
        body: cartData,
        headers: { 'content-type': 'application/json' },
      };

      toast.success('Adding to cart', {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      const res = await api.post(api_enpoint.addToCart, data);

      dispatch(addToCart(res.cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (data) => ({
  type: TYPES.ADD_TO_CART,
  payload: data,
});

/**
 *
 * @param {number} quantity
 */
export const countProducts = (quantity = 0) => ({
  type: TYPES.COUNT_CART,
  payload: quantity,
});
