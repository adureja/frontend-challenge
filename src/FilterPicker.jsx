import React from 'react';
import { Button, Dialog, Box, DialogTitle, DialogContent, MenuItem, DialogActions, TextField, Grid, Chip, Paper } from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    chipRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
});

class FilterPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filterPickerOpen: false,
            fieldMenuOpen: false,
            filterField: "mrr",
            filterValue: 0,
            filterOperator: ">"
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterDelete = this.handleFilterDelete.bind(this);

        this.handleFilterFieldChosen = this.handleFilterFieldChosen.bind(this);
        this.handleFilterOperatorChosen = this.handleFilterOperatorChosen.bind(this);
        this.handleFilterValueChosen = this.handleFilterValueChosen.bind(this);
    }

    handleClickOpen() {
        this.setState({
            filterPickerOpen: true
        });
    }

    handleClose() {
        this.setState({
            filterPickerOpen: false
        });
    }

    handleFilter(e) {
        let secondsSinceEpoch = Math.round(Date.now() / 1000);
        const filterObj = {
            'field': this.state.filterField,
            'operator': this.state.filterOperator,
            'value': Number(this.state.filterValue),
            'id': secondsSinceEpoch
        }
        if (Number.isNaN(filterObj.value)) return;
        this.props.onNewFilterObject(filterObj);
        this.handleClose();
    }

    handleFilterFieldChosen(e) {
        this.setState({
            filterField: e.target.value
        });
    }

    handleFilterOperatorChosen(e) {
        this.setState({
            filterOperator: e.target.value
        });
    }

    handleFilterValueChosen(e) {
        this.setState({
            filterValue: e.target.value
        });
    }

    handleListItemClick(col) {
        alert('col');
    }

    handleFilterDelete(featureId) {
        this.props.onDeleteFilterObj(featureId);
        this.handleClose();
    }

    render() {
        const { filters, classes } = this.props;
        const filterPickerOpen = this.state.filterPickerOpen;

        // Derive these in a more elegant manner (scan for str cols),
        // though it would be trivial if a separate data model was created
        const filterableFields = ["mrr", "termLength", "invoiceNo"];
        const operators = ["<", ">", "==", "!="];

        // Possible improvements:
        // - Break up list of filters from adding of filters
        // - More reusable components?
        // - Consider moving styling elsewhere - this was inspired from Material UI docs

        return (
            <Box p={0}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                    endIcon={<FilterListIcon />}
                >
                    Filters
                </Button>
                <Dialog open={filterPickerOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add or manage your filters here.</DialogTitle>
                    <DialogContent>
                        <Grid>
                            <TextField
                                id="outlined-select-field"
                                select
                                label="Field"
                                value={this.state.filterField}
                                className={classes.textField}
                                onChange={this.handleFilterFieldChosen}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                            >
                                {filterableFields.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid>
                            <TextField
                                id="outlined-select-operator"
                                select
                                label="Operator"
                                value={this.state.filterOperator}
                                className={classes.textField}
                                onChange={this.handleFilterOperatorChosen}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                            >
                                {operators.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-enter-value"
                                label="Value"
                                value={this.state.filterValue}
                                className={classes.textField}
                                onChange={this.handleFilterValueChosen}
                                margin="normal"
                                variant="outlined"
                            >
                            </TextField>
                        </Grid>
                        <Grid>
                            <Paper component="ul" elevation={0} className={classes.chipRoot}>
                                {filters.map((f) => (
                                    <li key={f.id}>
                                        <Chip
                                            label={`${f.field} ${f.operator} ${f.value}`}
                                            onDelete={() => this.handleFilterDelete(f.id)}
                                            className={classes.chip}
                                        />
                                    </li>
                                ))}
                            </Paper>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleFilter} color="primary">
                            Add Filter
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box >
        )
    }
}

export default withStyles(useStyles)(FilterPicker);