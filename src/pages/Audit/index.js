import React from 'react';
import MenuBar from '../../components/MenuBar';
import AuditGeneral from '../../components/AuditGenereal';
import { makeStyles } from '@material-ui/core';

const UseStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '1em',
        maxWidth: '40em'
    },
}))

function Audit() {
    const classes = UseStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <AuditGeneral />
            </div>
        </>

    );
}

export default Audit;