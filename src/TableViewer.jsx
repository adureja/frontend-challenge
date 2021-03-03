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

    getCols(data) {
        // Probably a more elegant soln
        let cols = []

        data.map((row) => {
            cols.push(Object.keys(row));
        });

        return cols;
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

        let columns = this.state.selectedColumns.map((columnName) =>
            <TableCell align="right">
                <b>{columnName}</b>
            </TableCell>
        );

        let rows = pipe_data.map((row) => (
            <TableCell align="right">{row.calories}</TableCell>
        ));

        return (
            <Box pt={3}>
                <div className={classes.toolbar} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {columns}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pipe_data.map((row) => (
                                <TableRow key={row.customerName}>
                                    {this.state.selectedColumns.map((col) => {
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