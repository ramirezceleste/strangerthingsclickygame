import React, { Component } from 'react';
import cards from '../../cards.json';
import './Game.css';
import Card from '../Card';

class Game extends Component {
  state = {
    strangerthings: cards,
    score: 0,
    randomNumber: 0
  }

  componentDidMount() {
    let random = Math.floor(Math.random() * 6) + 1;
    this.setState({
      randomNumber: random
    });
  }

  cardClickedOn = (id) => {
    if(id === this.state.randomNumber) {
      this.setState({
        score: this.state.score + 1
      });
    } 
    this.setState({
      strangerthings: this.shuffleArray(this.state.strangerthings)
    })
  };

  shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
  
  render() {
    const shuffleCards = this.shuffleArray(this.state.strangerthings);
    return (
      <div className="container">
          <h3>Random Number: {this.state.randomNumber}</h3>
          <h3>Score: {this.state.score}</h3>
          {shuffleCards.map(cast => (
           <Card
            key={cast.id} 
            id={cast.id} 
            name={cast.name} 
            image={cast.image}
            cardClickedOn={this.cardClickedOn} />
          ))} 
      </div>
    );
  }
}

export default Game;

// {this.state.strangerthings.map(cast => (