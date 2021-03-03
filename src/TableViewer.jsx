import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { pipe_data } from './constants';

class TableViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedColumns: [
                "customerName",
                "termLength",
                "status"
            ],
            filters: this.props.filters
        }
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

        let { dataset, selectedColumns } = this.props;
        let selectedColsArr = Array.from(selectedColumns);

        if (selectedColsArr.length < 1) {
            selectedColsArr.push("Pick a column!");
            dataset = [{
                "Pick a column!": "Click the button in the toolbar to choose columns"
            }];
        }

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
                            {dataset.map((row) => (
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