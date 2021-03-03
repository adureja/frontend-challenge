import React from 'react';
import { Button, Dialog, Box, DialogTitle, List, ListItem, ListItemText, Icon } from '@material-ui/core';
import { DeleteIcon } from '@material-ui/icons/Delete';

class FilterPicker extends React.Component {

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
    alert('col')
  }

  render() {
    const colPickerOpen = this.state.colPickerOpen;
    const columns = this.props.columns;

    return (
      <Box p={2}>
        <Button 
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
            endIcon={<DeleteIcon />} >
          Filter
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

export default FilterPicker;