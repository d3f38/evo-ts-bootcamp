import {
  PIZZA_ADDED_INTO_BASKET,
  PIZZA_REMOVED_FROM_BASKET,
  PIZZA_VIEWED,
} from "./constants";
import { Pizza, State } from "../types";

const initialState: State = {
  pizza: [],
  basket: [],
};

const addToBasket = (
  basket: Array<Pizza & { count: number }>,
  pizza: Pizza
) => {
  const existingIndexPizza = basket.findIndex(
    (item: any) => item._id === pizza._id
  );

  if (existingIndexPizza === -1) {
    console.log("🚀 ~ file: reducer.ts ~ line 32 ~ pizza", [
      ...basket,
      { ...pizza, count: 1 },
    ]);
    return [...basket, { ...pizza, count: 1 }];
  } else {
    basket[existingIndexPizza] = {
      ...basket[existingIndexPizza],
      count: (basket[existingIndexPizza].count += 1),
    };

    return basket;
  }
};

const removeFromBasket = (
  basket: Array<Pizza & { count: number }>,
  pizza: Pizza
) => {
  const existingIndexPizza = basket.findIndex(
    (item: any) => item._id === pizza._id
  );

  if (existingIndexPizza !== -1) {
    if (basket[existingIndexPizza].count - 1 !== 0) {
      basket[existingIndexPizza] = {
        ...basket[existingIndexPizza],
        count: (basket[existingIndexPizza].count -= 1),
      };
    } else {
      basket.splice(existingIndexPizza, 1);
    }
  }

  return basket;
};

export const reducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PIZZA_ADDED_INTO_BASKET: {
      return {
        ...state,
        basket: addToBasket(state.basket, action.payload),
      };
    }
    case PIZZA_REMOVED_FROM_BASKET: {
      return {
        ...state,
        basket: removeFromBasket(state.basket, action.payload),
      };
    }
    case PIZZA_VIEWED: {
      if (action.payload) {
        return { ...state, pizza: action.payload };
      }

      return state;
    }
    default:
      return state;
  }
};
