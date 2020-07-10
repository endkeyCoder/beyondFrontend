import React from 'react';
import UserEdit from '../../components/UserEdit';
import RegisterUserForm from '../../components/RegisterUserForm';
import MenuBar from '../../components/MenuBar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: '1em',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    item: {
        width: '90%',
        marginBottom: '1em'
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
                <section className={classes.item}>
                    <UserEdit />
                </section>
            </div>
        </>

    );
}
