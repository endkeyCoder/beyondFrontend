import React from 'react';
import MenuBar from '../../components/MenuBar';
import { makeStyles } from '@material-ui/core';

import FormPayments from '../../components/FormPayments';
import PlanPayments from '../../components/PlanPayments';
import Products from '../../components/ProductSetting';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1em',
        background: '#f1f1f1',
        flexWrap: 'wrap',
    },
    item:{
        marginBottom: '0 0.2em 0.1em 0'
    }
}))

export default function GeneralSettings() {
    const classes = useStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <FormPayments className={classes.item} />
                <PlanPayments className={classes.item} />
                <Products className={classes.item} />
            </div>
        </>
    );
}
