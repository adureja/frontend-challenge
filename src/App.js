import React from 'react';

import { Container } from '@material-ui/core';

import MainToolbar from './MainToolbar';
import TableBuilderBody from './TableBuilderBody';

import { pipe_data } from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);

    const cols = this.getCols(pipe_data);

    this.state = {
      dataset: pipe_data,
      columns: cols,
      selectedColumns: new Set(cols),
      filters: []
    }

    this.onColumnChange = this.onColumnChange.bind(this);
    this.onCreateFilter = this.onCreateFilter.bind(this);
    this.onDeleteFilter = this.onDeleteFilter.bind(this);

    this.onImport = this.onImport.bind(this);
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

  onCreateFilter(filter) {
    this.setState({
      filters: this.state.filters.concat(filter)
    });
  }

  onDeleteFilter(filterId) {
    this.setState({
      filters: this.state.filters.filter(function(f) {
        return f.id != filterId;
      })
    });
  }

  onImport(jsonStr) {
    try {
      // Parse to object
      let viewObj = JSON.parse(jsonStr);
      // Update state if valid
      if (viewObj.selectedColumns) {
        this.setState({
          selectedColumns: new Set(viewObj.selectedColumns)
        })
      }
      if (viewObj.filters) {
        this.setState({
          filters: viewObj.filters
        })
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e);
      }
    }
  }

  render() {
    let { columns, selectedColumns, dataset, filters } = this.state;

    let jsonView = JSON.stringify({
      "selectedColumns": Array.from(selectedColumns),
      "filters": filters
    });

    return (
      <Container disableGutters>
        <MainToolbar
          allColumns={columns}
          selectedColumns={selectedColumns}
          filters={filters}
          jsonView={jsonView}
          onCreateFilter={this.onCreateFilter}
          onDeleteFilter={this.onDeleteFilter}
          onImportJson={this.onImport}
          onColumnChange={this.onColumnChange} />
        <TableBuilderBody
          selectedColumns={selectedColumns}
          filters={filters}
          dataset={dataset} />
      </Container>
    );
  }
}

export default App;
