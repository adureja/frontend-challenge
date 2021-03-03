import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TableViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    filterData(data, filters) {
        // Possible improvements: 
        // - make this way shorter
        // - consider more efficient traversal rather than each filter for each row (fine for this demo data)
        // - could use JS string parsing to advantage? can be confusing n unreadable
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

        // Insert some instructions if no columns selected
        if (selectedColsArr.length < 1) {
            selectedColsArr.push("Pick a column!");
            filteredDataset = [{
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