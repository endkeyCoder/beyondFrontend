//import de libs react
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import dos arquivos de configuração
import apiBeyond from '../../config/apiBeyond';
import { setUserAuthentication } from '../../config/redux/actions';
import { Typography, Button, FormControl, InputLabel, Input, InputAdornment, IconButton, Paper } from '@material-ui/core';
import { Visibility, VisibilityOff, AccountCircle } from '@material-ui/icons';

//import dos arquivos de estilos
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45vh'
    },
    title: {
        fontSize: 'large'
    },
    item: {
        width: '100%',
        marginBottom: '0.5em'
    }
}))
export default function SigninForm() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState({
        show: false,
        value: ''
    });

    const dispatch = useDispatch();

    const globalState = useSelector(state => state)
    async function login(e) {
        e.preventDefault();
        try {
            const resLogin = await apiBeyond.post('/login', {
                nick,
                password: password.value
            })
            if (resLogin.data.message.statusCode === 200) {
                dispatch(setUserAuthentication(resLogin.data.data, resLogin.data.permissions));
            } else {
                alert(resLogin.data.message.observation);
            }
        } catch (error) {
            alert('problema ao realizar login => ', error)
            console.log(error)
            return false;
        }
    }

    function handleNick(nick) {
        setNick(nick)
    }
    function handlePassword(valuePassword) {
        setPassword({
            ...password,
            value: valuePassword
        })
    }
    function handleClickShowPassword() {
        setPassword({
            ...password,
            show: !password.show
        })
    }
    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    const classes = useStyles();

    if (globalState.userReducer.user.data.token !== undefined) {
        return <Redirect to={{ pathname: '/' }} />
    } else {
        return (
            <Paper onSubmit={login} elevation={3} component="form" className={classes.container}>
                <Typography className={classes.title} variant="caption">Bem vindo ao Beyond</Typography>
                <FormControl className={classes.item}>
                    <InputLabel htmlFor="nick">Usuário</InputLabel>
                    <Input
                        id="nick"
                        onChange={(e) => handleNick(e.target.value)}
                        value={nick}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <AccountCircle />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.item}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={password.show ? 'text' : 'password'}
                        value={password.value}
                        onChange={(e) => handlePassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {password.show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.item}>
                    <Button type="submit" variant="contained"><Typography variant="caption">Login</Typography></Button>
                </FormControl>
            </Paper>
        );
    }
}
