import React from 'react';
import FormSignin from '../../components/SigninForm';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '97vh'
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))
export default function Signin() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <section className={classes.section}>
                <FormSignin />
            </section>
        </div>

    );
}
