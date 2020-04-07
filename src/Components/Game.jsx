import React, { Component } from 'react';
import Box from './Box';
// import winnerChick from './../images/winner.jpg';
export default class Game extends Component {
  state = {
    boxs: Array(9).fill(null),
    oIsNext: true, // start of x
    OCount: 0,
    XCount: 0,
    round: 1,
    winnerWinnerChickenDinner: false,
    winIndex: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    lastIndex: null,
  };

  CheckWinner(boxs) {
    let isWinner = false;
    let player = null;
    const { winIndex } = this.state;
    winIndex.forEach((element) => {
      const [a, b, c] = element;
      if (
        boxs[a] &&
        boxs[b] &&
        boxs[c] &&
        boxs[a] === boxs[b] &&
        boxs[b] === boxs[c]
      ) {
        isWinner = true;
        player = boxs[a] === 'X' ? 'X' : 'O';
      }
    });

    return { isWinner, player };
  }

  handleClick = (e) => {
    const i = e.target.id;
    e.target.setAttribute('disabled', 'disabled');
    const {
      boxs,
      oIsNext,

      winnerWinnerChickenDinner,
    } = this.state;

    if (winnerWinnerChickenDinner) {
      e.preventDefault();
      return;
    }

    const _boxs = [...boxs];
    _boxs[i] = oIsNext ? 'X' : 'O';

    const checkWinner = this.CheckWinner(_boxs);

    this.setState((preStat) => ({
      boxs: _boxs,
      oIsNext: !oIsNext,
      round: preStat.round + 1,
      XCount: checkWinner.player === 'X' ? preStat.XCount + 1 : preStat.XCount,
      OCount: checkWinner.player === 'O' ? preStat.OCount + 1 : preStat.OCount,
      winnerWinnerChickenDinner: checkWinner.isWinner,
    }));
  };

  buildBox(i) {
    const { winnerWinnerChickenDinner, lastIndex } = this.state;
    const disabl = i === lastIndex ? true : winnerWinnerChickenDinner;
    const { boxs } = this.state;
    return (
      <Box
        vlaue={boxs[i]}
        id={i}
        onclick={this.handleClick}
        disabled={disabl}
      />
    );
  }

  newGameHandler = () => {
    this.setState({
      boxs: Array(9).fill(null),
      oIsNext: true,
      Xhistory: [],
      Ohistory: [],
      round: 1,
      winnerWinnerChickenDinner: false,
    });
  };
  ResetGameHandler = () => {
    this.setState({
      boxs: Array(9).fill(null),
      oIsNext: true,
      Xhistory: [],
      Ohistory: [],
      OCount: 0,
      XCount: 0,
      round: 1,
      winnerWinnerChickenDinner: false,
    });
  };

  render() {
    const { oIsNext, XCount, OCount } = this.state;
    console.log(this.state);
    const current = oIsNext ? 'X' : 'O';
    const boxs = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
      return <li key={item.toString()}>{this.buildBox(item)}</li>;
    });
    return (
      <div>
        <h2>Current Player : {current} </h2>
        <div>
          <ul className="game-board">{boxs}</ul>
        </div>
        <div className="counter-box">
          <div className="row">
            <div className="XPlayer counter-box">
              <label>X Player</label>
              <Box vlaue={XCount} disabled="disabled" />
            </div>
            <div className="OPlayer counter-box">
              <label>O plyaer</label>
              <Box vlaue={OCount} disabled="disabled" />
            </div>
          </div>
          <div>
            <button onClick={this.newGameHandler}>Start New Game</button>
            <button onClick={this.ResetGameHandler}>Resrt</button>
          </div>
        </div>
      </div>
    );
  }
}
