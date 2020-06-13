import React from 'react';
import RegisterUserForm from '../../components/RegisterUserForm'
import MenuBar from '../../components/MenuBar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '1em',
    },
    item: {
        maxWidth: '40em'
    }
}))

export default function RegisterUser() {
    const classes = useStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                <section className={classes.item}>
                    <RegisterUserForm />
                </section>
            </div>
        </>

    );
}
