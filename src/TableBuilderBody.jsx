import { Container, Grid, Toolbar } from '@material-ui/core';
import ColumnPicker from './ColumnPicker';
import TableViewer from './TableViewer';

export default function TableBuilderBody() {
    return (
        <Grid container spacing={5}>
            <Grid item xs={1} md={2}>
            </Grid>
            <Grid item xs={10} md={8}>
                <TableViewer />
            </Grid>
            <Grid item xs={1} md={2}>
            </Grid>
        </Grid>
    )
}