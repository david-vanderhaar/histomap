import React from 'react';
import './App.css';
import * as StateGenerator from './lib/generators/state';
import * as Events from './lib/events';
import * as Cycling from './lib/turchin_cycling';

class Histomap extends React.Component {

  componentDidMount() {
    let polities = Cycling.generatePolities(10);
    console.table(polities);
    polities = Cycling.run(polities, 10);
    console.table(polities);
  }

  render() {
    return (
      <p>
        Histomap
      </p>
    );
  }
}

export default Histomap;
