import React, { useCallback } from "react";
import { Basket, Pizza, State } from "../types";

import { getPizza } from "../services/api";
import * as R from "ramda";

import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

export function useApp() {
  const dispatch = useDispatch();

  const addPizza = (obj: Pizza) => dispatch(actions.addPizza(obj));
  const removePizza = (obj: Pizza) => dispatch(actions.removePizza(obj));
  const loadPizza = (array: Pizza[]) => dispatch(actions.loadPizza(array));

  const { pizza, basket } = useSelector((state: State) => state);

  const handleAddPizza = React.useCallback(
    (_id: string) => {
      const p = pizza.filter((x) => x._id === _id)[0];

      addPizza(p);
    },
    [pizza]
  );

  const handleMinusPizza = useCallback(
    (_id: string) => {
      const idx = R.findLastIndex((x: Pizza) => x._id === _id)(basket);
      if (idx !== -1) {
        removePizza(basket[idx]);
      }
    },
    [basket]
  );

  React.useEffect(() => {
    getPizza().then((pizza) => {
      loadPizza(pizza.items);
    });
  }, []);

  return {
    totalPrice: basket.reduce((acc, p: Basket) => acc + p.price * p.count, 0),
    pizza,
    basket,
    handleAddPizza,
    handleMinusPizza,
  };
}
