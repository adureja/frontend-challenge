import React from 'react';

import { pipe_data } from './constants'; 

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import ColumnPicker from './ColumnPicker';
import FilterPicker from './FilterPicker';
import ExportViewDialog from './ExportViewDialog';
import ImportViewDialog from './ImportViewDialog';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "lightgrey",
        zIndex: 1500
    },
    title: {
        flexGrow: 1,
        color: "black"
    }
});

class MainToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colPickerOpen: false,
            exportModalOpened: false,
            importModalOpened: false
        }

        this.onSelectedColumnChange = this.onSelectedColumnChange.bind(this);
        this.onNewFilterObject = this.onNewFilterObject.bind(this);
        this.onDeleteFilterObj = this.onDeleteFilterObj.bind(this);
        this.onImportJson = this.onImportJson.bind(this);

        this.openImportModal = this.openImportModal.bind(this);
        this.closeImportModal = this.closeImportModal.bind(this);

        this.openExportModal = this.openExportModal.bind(this);
        this.closeExportModal = this.closeExportModal.bind(this);
    }
    
    onNewFilterObject(filter) {
        this.props.onCreateFilter(filter);
    }

    onDeleteFilterObj(filterId) {
        this.props.onDeleteFilter(filterId);
    }
    
    onSelectedColumnChange(selected_col) {
        this.props.onColumnChange(selected_col);
    }

    openExportModal() {
        console.log('open');
        this.setState({
            exportModalOpened: true
        });
    }

    closeExportModal() {
        this.setState({
            exportModalOpened: false
        });
    }

    openImportModal() {
        this.setState({
            importModalOpened: true
        });
    }

    closeImportModal() {
        this.setState({
            importModalOpened: false
        });
    }

    onImportJson(jsonStr) {
        console.log(jsonStr);
        this.props.onImportJson(jsonStr);
    }

    render() {
        const { classes, allColumns, selectedColumns, filters, jsonView } = this.props;

        let { importModalOpened, exportModalOpened } = this.state;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Subscriptions
                        </Typography>
                        <FilterPicker 
                            filters={filters}
                            columns={allColumns}
                            onDeleteFilterObj={this.onDeleteFilterObj}
                            onNewFilterObject={this.onNewFilterObject}  />
                        <ColumnPicker 
                            columns={allColumns}
                            selectedColumns={selectedColumns}
                            onSelectedColumnChange={this.onSelectedColumnChange} />
                        <ButtonGroup>
                            <Button variant="contained"
                                color="secondary"
                                onClick={this.openImportModal} >
                                Import
                            </Button>
                            <ImportViewDialog 
                                onImport={this.onImportJson}
                                closeImportModal={this.closeImportModal}
                                open={importModalOpened} />
                            <Button variant="contained"
                                color="primary"
                                onClick={this.openExportModal} >
                                Export
                            </Button>
                            <ExportViewDialog 
                                jsonView={jsonView}
                                closeExportModal={this.closeExportModal}
                                open={exportModalOpened} />
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(useStyles)(MainToolbar);
