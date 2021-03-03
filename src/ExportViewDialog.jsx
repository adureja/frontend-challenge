import React from 'react';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField} from '@material-ui/core';

class ExportViewDialog extends React.Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeExportModal();
    }

    render() {
        let { open, jsonView } = this.props;

        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Export</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Copy this block of JSON code to access this view in the future.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={jsonView}
                        id="jsonView"
                        label="JSON"
                        variant="filled"
                        fullWidth
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

export default ExportViewDialog;