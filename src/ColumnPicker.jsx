import React from 'react';
import { Button, Dialog, Box, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { pipe_data } from './constants';

class ColumnPicker extends React.Component {

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
  }

  handleClose() {
    this.setState({
      colPickerOpen: false
    });
  }

  handleListItemClick(col) {
    let selCol = this.state.selectedColumns;
    if (selCol.has(col)) {
      selCol.delete(col);
    } else {
      selCol.add(col);
    }
    this.setState({
      selectedColumns: selCol
    });

    this.props.onSelectedColumnChange(selCol);

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

    const colPickerOpen = this.state.colPickerOpen;

    const columns = this.props.columns;
    const selectedColumns = this.state.selectedColumns;

    return (
      <Box p={2}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Pick Columns
        </Button>
        <Dialog onClose={this.handleClose}
          open={colPickerOpen}>
          <DialogTitle id="simple-dialog-title">
            Pick the columns you want to see in the Table Builder.
          </DialogTitle>
          <List>
            {this.state.columns.map((col) => (
              <ListItem button selected={this.state.selectedColumns.has(col)} onClick={() => this.handleListItemClick(col)} key={col}>
                <ListItemText primary={col} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      </Box>
    )
  }
}

export default ColumnPicker;