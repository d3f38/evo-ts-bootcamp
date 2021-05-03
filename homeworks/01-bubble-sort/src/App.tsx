import React from "react";

import "./App.css";

import { timer, generateArray } from "./helpers";

enum Statuses {
  SOLVED = "Solved",
  NOT_SOLVED = "Not solved",
}

type State = {
  values: number[];
  status: Statuses;
  isPlaying: boolean;
  interval: number;
};
class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      values: [],
      status: Statuses.NOT_SOLVED,
      isPlaying: true,
      interval: 100,
    };
  }

  async sort(randomNumbers: number[], isHandle?: boolean) {
    let i = 0;
    let swapped = true;

    while (swapped) {
      swapped = false;
      i = 0;

      while (i < randomNumbers.length - 1) {
        if (randomNumbers[i] > randomNumbers[i + 1]) {
          if (!isHandle) {
            await timer(this.state.interval, this.state.isPlaying);
          }

          let swap = randomNumbers[i];
          randomNumbers[i] = randomNumbers[i + 1];
          randomNumbers[i + 1] = swap;
          swapped = true;

          this.setState({ values: randomNumbers });

          if (isHandle) return;
        }

        i++;
      }
    }

    this.setState({ status: Statuses.SOLVED, isPlaying: false });
  }

  generateNewSet() {
    const randomNumbers = generateArray();

    this.setState({ values: randomNumbers });
  }

  componentDidMount() {
    this.generateNewSet();
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.isPlaying !== this.state.isPlaying) {
      this.sort(this.state.values);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">Bubble sort 🛁</h1>

          <div className="wrapper">
            {this.state.values.map((item) => (
              <div
                key={item + Math.random()}
                className="column"
                style={{
                  height: `${2 * item}px`,
                }}
              />
            ))}
          </div>

          <div className="controls">
            <label className="update-time">
              update time:{" "}
              <input
                type="number"
                onChange={({ target: { value } }) => {
                  this.setState({ interval: +value });
                }}
                value={this.state.interval}
              />{" "}
              ms
            </label>

            <button
              className="new-set"
              onClick={() => {
                this.setState({ status: Statuses.NOT_SOLVED, isPlaying: true });

                this.generateNewSet();
              }}
            >
              New set
            </button>

            <button
              className="start-stop"
              onClick={() => {
                this.setState({
                  isPlaying: !this.state.isPlaying,
                });
              }}
              disabled={this.state.status === Statuses.SOLVED}
            >
              {this.state.isPlaying ? "Start" : "Pause"}
            </button>

            <button
              className="next-step"
              onClick={() => {
                this.sort(this.state.values, true);
              }}
              disabled={
                this.state.status === Statuses.SOLVED || !this.state.isPlaying
              }
            >
              Next step
            </button>
          </div>

          <div className="status">{this.state.status}</div>
        </div>
      </div>
    );
  }
}

export default App;
