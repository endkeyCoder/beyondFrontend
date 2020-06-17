import React, { useEffect } from 'react';
import Menu from '../../components/MenuBar';
import CardInfoUser from '../../components/CardInfoUser';
import ChangePassword from '../../components/ChangePassword';
import apiBeyond from '../../config/apiBeyond';
import { useDispatch, useSelector } from 'react-redux';
import { setExternalUsers } from '../../config/redux/actions';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: '1em',
        [theme.breakpoints.down('sm')]:{
            flex: 'auto'
        },
        [theme.breakpoints.down('md')]:{
            justifyContent: 'flex-start'
        }
    },

}))
export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const externalUsers = useSelector(state => state.externalUsersReducer.externalUsers)

    async function loadExternalUsers() {
        try {
            const resGetExternalUsers = await apiBeyond.get('/getExternalUsers');
            if (resGetExternalUsers.data.data.length > 0) {
                dispatch(setExternalUsers(resGetExternalUsers.data.data))
            }
        } catch (error) {
            console.log('print de error em getExternalUsers => ', error);
            alert('Problema ao carregar usuários externos')
        }
    }

    useEffect(() => {
        if (externalUsers.length <= 0) {
            loadExternalUsers()
        }
    })
    return (
        <>
            <Menu />
            <section className={classes.container}>
                <CardInfoUser />
                <ChangePassword />
            </section>
        </>
    );
}
