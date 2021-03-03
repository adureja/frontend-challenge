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
            colPickerOpen: false
        }

        this.onSelectedColumnChange = this.onSelectedColumnChange.bind(this);
        this.onNewFilterObject = this.onNewFilterObject.bind(this);
        this.onDeleteFilterObj = this.onDeleteFilterObj.bind(this);
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

    render() {
        const { classes, allColumns, selectedColumns, filters } = this.props;
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
                                onClick={() => { alert('4') }} >
                                Import
                            </Button>
                            <Button variant="contained"
                                color="primary"
                                onClick={() => { alert('4') }} >
                                Export
                            </Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(useStyles)(MainToolbar);
