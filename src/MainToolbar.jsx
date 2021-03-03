import React from 'react';

import { pipe_data } from './constants'; 

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ButtonGroup } from '@material-ui/core';
import ColumnPicker from './ColumnPicker';

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
    }
    
    onSelectedColumnChange(selected_col) {
        this.props.onColumnChange(selected_col);
    }

    render() {
        const { classes, allColumns, selectedColumns } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Subscription List
                        </Typography>
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
