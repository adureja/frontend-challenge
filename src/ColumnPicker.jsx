import React from 'react';
import { Button, Dialog, Box, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { pipe_data } from './constants';

class ColumnPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: pipe_data,
      columns: this.props.columns,
      selectedColumns: [
        "customerName",
        "termLength",
        "status"
      ],
      colPickerOpen: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  getCols(data) {
    // Probably a more elegant soln
    let cols = []

    data.map((row) => {
      cols.push(Object.keys(row));
    });

    return cols;
  }

  handleClickOpen() {
    this.setState({
      colPickerOpen: true
    });
    alert('set state');
  }

  handleClose() {
    this.setState({
      colPickerOpen: false
    });
    alert('o dear');
  }

  handleListItemClick() {
    alert('o werd');
  }

  render() {
    const classes = makeStyles((theme) => ({
      // necessary for content to be below app bar
      toolbar: {
        height: "10vh",
      },
      table: {
        minWidth: 650,
        padding: theme.spacing(2)
      },
      tableContainer: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(2)
      }
    }));

    return (
      <Box p={2}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Pick Columns
        </Button>
        <Dialog onClose={this.handleClose}
          open={this.state.colPickerOpen}>
          <DialogTitle id="simple-dialog-title">
            Pick the columns you want to see in the Table Builder.
          </DialogTitle>
          <List>
            {this.state.selectedColumns.map((col) => (
              <ListItem button onClick={() => this.handleListItemClick(col)} key={col}>
                <ListItemText primary={col} />
              </ListItem>
            ))}
            <ListItem autoFocus button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemText primary="Add account" />
            </ListItem>
          </List>
        </Dialog>
      </Box>
    )
  }
}

export default ColumnPicker;