import React from 'react';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';

import { pipe_data } from './constants';

class TableViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    filterData(data, filters) {
        // To whomever reads this: sorry
        if (!data) return data;
        return data.filter(x => {
            console.log(x);
            let isValidForArr = true;
            filters.forEach(function (f) {
                console.log(f);
                switch (f.operator) {
                    case "<":
                        if (x[f.field] >= f.value) isValidForArr = false;
                        break;
                    case ">":
                        if (x[f.field] <= f.value) isValidForArr = false;
                        break;
                    case "!=":
                        if (x[f.field] == f.value) isValidForArr = false;
                        break;
                    case "==":
                        if (x[f.field] != f.value) isValidForArr = false;
                        break;
                    default:
                        break;
                }
            });
            return isValidForArr;
        });
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

        let { dataset, selectedColumns, filters } = this.props;
        let filteredDataset = this.filterData(dataset, filters);

        let selectedColsArr = Array.from(selectedColumns);

        if (selectedColsArr.length < 1) {
            selectedColsArr.push("Pick a column!");
            filteredDataset = [{
                "Pick a column!": "Click the button in the toolbar to choose columns"
            }];
        }

        console.log("filtered_dataset: ");
        console.log(filteredDataset);

        return (
            <Box pt={3}>
                <div className={classes.toolbar} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {selectedColsArr.map((columnName) =>
                                    <TableCell align="center">
                                        <b>{columnName}</b>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDataset.map((row) => (
                                <TableRow key={row.customerName}>
                                    {selectedColsArr.map((col) => {
                                        return (
                                            <TableCell align="right">{row[col]}</TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    }
}

export default TableViewer;