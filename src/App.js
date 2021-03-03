import React from 'react';

import { Container } from '@material-ui/core';

import MainToolbar from './MainToolbar';
import TableBuilderBody from './TableBuilderBody';

import { pipe_data } from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);
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
