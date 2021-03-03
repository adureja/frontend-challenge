import React from 'react';
import { Button, Dialog, Box, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';

import TableChartIcon from '@material-ui/icons/TableChart';

class ColumnPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      colPickerOpen: false
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
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
    this.props.onSelectedColumnChange(col);
  }

  render() {
    const colPickerOpen = this.state.colPickerOpen;

    const columns = this.props.columns;
    const selectedColumns = this.props.selectedColumns;

    return (
      <Box p={3}>
        <Button endIcon={<TableChartIcon />} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Pick Columns
        </Button>
        <Dialog onClose={this.handleClose}
          open={colPickerOpen}>
          <DialogTitle id="simple-dialog-title">
            Toggle the columns shown in the Table Builder.
          </DialogTitle>
          <List>
            {columns && columns.map((col) => (
              <ListItem 
                button 
                selected={selectedColumns.has(col)} 
                onClick={() => this.handleListItemClick(col)} 
                key={col}>
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