import React, { Component } from 'react';
import cards from '../../cards.json';
import './Game.css';
import Card from '../Card';

class Game extends Component {
  state = {
    strangerthings: cards,
    score: 0,
    topScore: 0,
    message: "Click an image but not twice!", // Default message 
    clicked: [], // Empty array to keep track of clicked 
  }

  cardClickedOn = (clicked) => {
    if (this.state.clicked.includes(clicked)) { // Includes determines whether an array has a certain element
      this.setState({
        score: 0,
        clicked: [],
        message: "You clicked an image twice. Try Again."
      })
    } else {
      this.updateScore();
    }
    this.state.clicked.push(clicked) // Pushing the clicked into the array
    this.shuffleArray();
    this.winner();
  };

  updateScore = () => {
    if (this.state.score === this.state.topScore) {
      this.setState({
        score: this.state.score + 1,
        topScore: this.state.topScore + 1,
        message: "Correct, awesome job!"
      })
    } 
    if (this.state.score < this.state.topScore) {
      this.setState({
        score: this.state.score + 1,
        message: "Correct, awesome job!"
      })
    }
  }

  winner = () => {
    if (this.state.score === 6) { // Only have 6 cards
      return this.setState({
        score: 0,
        clicked: [],
        message: "Congrats, you won!"
      })
    }
  }

  shuffleArray = () => {
    let array = this.state.strangerthings;
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({
      strangerthings: array
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Score: {this.state.score} </h3>
        <h3>Top Score: {this.state.topScore} </h3>
        <h3>Message: {this.state.message} </h3>
        <div className="container">
        {this.state.strangerthings.map(cast => (
          <Card
            key={cast.id}
            id={cast.id}
            name={cast.name}
            image={cast.image}
            cardClickedOn={this.cardClickedOn} />
        ))}
        </div>
      </div>
    );
  }
}

export default Game;
