import React from 'react';
import MenuBar from '../../components/MenuBar';
import { makeStyles } from '@material-ui/core';

import FormPayments from '../../components/FormPayments';
import PlanPayments from '../../components/PlanPayments';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1em',
        background: '#f1f1f1',
        flexWrap: 'wrap',
       
    }
}))

export default function GeneralSettings() {
    const classes = useStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <FormPayments />
                <PlanPayments />
            </div>
        </>
    );
}
