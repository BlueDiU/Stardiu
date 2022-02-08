import { TYPES } from '../types/types';

import { api_enpoint } from '../../helpers/helpApi';
import { helpHttp } from '../../helpers/helpHttp';
import Swal from 'sweetalert2';

// instance for http helper
const api = helpHttp();

/* ----- SHOPPING CART SECTION ----- */

/**
 *
 * @param {{userId}} userId user id when has been logged
 * @returns
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

      Swal.fire({
        text: 'Wait a moment 😀',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await api.post(api_enpoint.addToCart, data);

      Swal.close();

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
