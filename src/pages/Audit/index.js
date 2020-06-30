import React from 'react';
import MenuBar from '../../components/MenuBar';
import AuditGeneral from '../../components/AuditGenereal';
import SalesTable from '../../components/SalesTable';
import { makeStyles } from '@material-ui/core';

const UseStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'column',
    },
}))

function Audit() {
    const classes = UseStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <AuditGeneral />
                <SalesTable />
            </div>
        </>

    );
}

export default Audit;