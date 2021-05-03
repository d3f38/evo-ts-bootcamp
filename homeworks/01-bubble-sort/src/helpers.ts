const MIN_COLUMNS = 10;
const MAX_COLUMNS = 50;
const MAX_NUMBER_VALUE = 100;

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const timer = (ms: number, deleted: boolean) =>
  new Promise((res) => {
    const timeout = setTimeout(res, ms);

    if (deleted) {
      clearTimeout(timeout);
    }
  });

const randomArray = (length: number, max: number) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

const generateArray = (): number[] =>
  randomArray(randomNumber(MIN_COLUMNS, MAX_COLUMNS), MAX_NUMBER_VALUE);

export { timer, generateArray };
