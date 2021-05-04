import { Action } from "redux";

export type Pizza = {
  name: string;
  price: number;
  _id: string;
};

export type Basket = Pizza & { count: number };

export type State = {
  pizza: Pizza[];
  basket: Basket[];
};

export type PizzaAction = {
  type: string;
  pizza: Pizza[];
};

export type ActionType = Action & {
  payload: Pizza[] | Basket[];
};

export type DispatchType<ActionType> = (args: ActionType) => ActionType;
