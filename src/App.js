import React from 'react';

import { Container } from '@material-ui/core';

import MainToolbar from './MainToolbar';
import TableBuilderBody from './TableBuilderBody';

import { pipe_data } from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: pipe_data,
      columns: [
        "customerName",
        "termLength",
        "status"
      ],
      selectedColumns: new Set([
        "customerName",
        "termLength",
        "status"
      ]),
    }

    this.onColumnChange = this.onColumnChange.bind(this);
  }

  getCols(data) {
    // Probably a more elegant soln
    let cols = new Set();

    data.map((row) => {
      Object.keys(row).map((key) => {
        cols.add(key);
      })
    });

    return Array.from(cols);
  }

  onColumnChange(col) {
    let selCol = this.state.selectedColumns;
    if (selCol.has(col)) {
      selCol.delete(col);
    } else {
      selCol.add(col);
    }
    this.setState({
      selectedColumns: selCol
    });
  }

  render() {
    let { columns, selectedColumns, dataset } = this.state;

    return (
      <Container disableGutters>
        <MainToolbar
          allColumns={columns}
          selectedColumns={selectedColumns}
          onColumnChange={this.onColumnChange} />
        <TableBuilderBody
          selectedColumns={selectedColumns}
          dataset={dataset} />
          Ayyy lmao
      </Container>
    );
  }
}

export default App;
