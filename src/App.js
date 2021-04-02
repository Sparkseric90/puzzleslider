import React from 'react';
import './App.css';
import Gameboard from './Gameboard.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <h1 className='col-12 text-center display-3'>Slide-Puzzle</h1>
        <div className='row'>
          <Gameboard rows={4} columns={4} />
        </div>
      </>
    )
  }
}