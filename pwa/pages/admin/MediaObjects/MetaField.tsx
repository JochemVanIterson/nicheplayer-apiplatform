import * as React from 'react';

import { Labeled } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const MetaTable = (props) => {
    const {record, source, size, label} = props

    const useStyles = makeStyles({
        table: {
        minWidth: 650,
        },
    });

    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
                <Table className={classes.table} size={size} aria-label="simple table">
                    <TableBody>
                        {Object.entries(record[source]).map((row) => {
                            const key = row[0];
                            const value = typeof row[1] === 'object'?JSON.stringify(row[1]):row[1];
                            return (
                            <TableRow key={row[0]}>
                                <TableCell component="th" scope="row" style={{textTransform: 'capitalize', width:120}}>
                                {row[0]}
                                </TableCell>
                                <TableCell align="left">{value}</TableCell>
                            </TableRow>
                            )
                        })}
                        {Object.keys(record[source]).length == 0 && (
                            <TableRow>
                                <TableCell colSpan={2} align="center">Leeg</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}

const MetaField = (props) => 
(props.label)?
    <Labeled label={props.label}>
        <MetaTable {...props}/>
    </Labeled>:
    <MetaTable {...props}/>



export default MetaField;