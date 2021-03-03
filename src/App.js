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
      colPickerOpen: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  render() {
    return (
      <Container disableGutters>
          <MainToolbar />
          <TableBuilderBody />
          Ayyy lmao
      </Container>
    );
  }
}

export default App;
