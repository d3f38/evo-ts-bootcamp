import { interval, combineLatest, fromEvent } from "rxjs";
import { filter, scan, tap, map } from "rxjs/operators";

import "./index.css";

const windows = document.querySelectorAll(".window");
const counter = document.querySelector(".counter span")!;

const getRandomWindow = () =>
  Math.floor(Math.random() * (Math.floor(windows.length - 1) + 1));

const clearWindow = () => {
  windows.forEach((item) => item.classList.remove("window-with-cat"));
};

const increment = (count: number) => count + 1;

const addCatToWindow = (index: number) =>
  windows[index].classList.add("window-with-cat");

const catchCat = (ev: Event) =>
  (ev.target as HTMLElement).className.indexOf("window-with-cat") !== -1;

const addPoint = (points: number) => (counter.innerHTML = `${points}`);

const cat$ = interval(1000).pipe(
  tap(clearWindow),
  map(getRandomWindow),
  map(addCatToWindow)
);

const player$ = fromEvent(document, "click").pipe(
  filter(catchCat),
  tap(clearWindow),
  scan(increment, 0),
  tap(addPoint)
);

const game$ = combineLatest([player$, cat$]);

game$.subscribe();
