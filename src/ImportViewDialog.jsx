import React from 'react';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField} from '@material-ui/core';

class ImportViewDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            importedJson: ""
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleImport = this.handleImport.bind(this);

        this.updateImportedJson = this.updateImportedJson.bind(this);
    }

    handleClose() {
        this.props.closeImportModal();
    }

    handleImport(jsonStr) {
        this.props.onImport(this.state.importedJson);
        this.handleClose();
    }

    updateImportedJson(e) {
        this.setState({
            importedJson: e.target.value
        })
    }

    render() {
        let { open } = this.props;

        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Import</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insert a previously generated JSON view into the Table Builder.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="jsonView"
                        onChange={this.updateImportedJson}
                        label="JSON"
                        variant="filled"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleImport} color="primary" variant="outlined">
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

export default ImportViewDialog;