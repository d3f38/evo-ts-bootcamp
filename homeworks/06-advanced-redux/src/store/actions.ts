import {
  PIZZA_ADDED_INTO_BASKET,
  PIZZA_REMOVED_FROM_BASKET,
  PIZZA_VIEWED,
} from "./constants";
import { Pizza } from "../types";

export const loadPizza = (array: Pizza[]) => ({
  type: PIZZA_VIEWED,
  payload: array,
});

export const addPizza = (obj: Pizza) => ({
  type: PIZZA_ADDED_INTO_BASKET,
  payload: obj,
});

export const removePizza = (obj: Pizza) => ({
  type: PIZZA_REMOVED_FROM_BASKET,
  payload: obj,
});
