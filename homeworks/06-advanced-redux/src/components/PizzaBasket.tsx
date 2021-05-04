import * as R from "ramda";
import React from "react";
import { Pizza } from "../types";
import { PizzaBasketItem } from "./PizzaBasketItem";
interface PizzaBasketProps {
  basket: Array<Pizza & { count: number }>;
  onMinus: (_id: string) => void;
}

export const PizzaBasket = ({ basket, onMinus }: PizzaBasketProps) => {
  return (
    <>
      {R.map(
        (p) => (
          <PizzaBasketItem
            _id={p._id}
            onMinus={onMinus}
            key={p._id}
            price={p.price}
            name={p.name}
            count={p.count}
          />
        ),
        basket
      )}
    </>
  );
};
