import React from 'react';

import { Container, Grid, Toolbar } from '@material-ui/core';
import ColumnPicker from './ColumnPicker';
import TableViewer from './TableViewer';

class TableBuilderBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { selectedColumns, dataset } = this.props
        return (
            <Grid container spacing={5}>
                <Grid item xs={1} md={2}>
                </Grid>
                <Grid item xs={10} md={8}>
                    <TableViewer
                        selectedColumns={selectedColumns}
                        dataset={dataset} />
                </Grid>
                <Grid item xs={1} md={2}>
                </Grid>
            </Grid>
        );
    }
}

export default TableBuilderBody;