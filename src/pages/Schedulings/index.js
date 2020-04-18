import React from 'react';
import MenuBar from '../../components/MenuBar';
import ShedulingPost from '../../components/SchedulingPost';
import SelectSchedulings from '../../components/SelectSchedulings';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '1em',
    }
}))

export default function Schedulings() {
    const classes = useStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <ShedulingPost />
                <SelectSchedulings />
            </div>
        </>
    );
}
