import React, { useState } from 'react';
import { Paper, TextField, Button, makeStyles, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';
import apiBeyond from '../../config/apiBeyond';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'column',
        width: '35em',
        [theme.breakpoints.down('sm')]: {
            flex: 'auto'
        }
    },
    header: {
        marginBottom: '0.4em'
    },
    container2: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '1em'
    },
    item: {
        minWidth: '15em',
        margin: '0 0.5em 0 0',
        [theme.breakpoints.down('sm')]: {
            flex: 'auto',
            margin: '0 0.5em 0.5em 0'
        }
    },
    alert: {
        display: 'none'
    }
}))

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassowrd] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [myAlert, setAlert] = useState({
        show: false,
        message: '',
        status: 'success'
    });
    const user = useSelector(state => state.userReducer.user.data);
    
    function handleOldPassword(value) {
        setOldPassword(value)
    }
    function handleNewPassword(value) {
        setNewPassowrd(value)
    }
    function handleRepatPass(value) {
        setRepeatPass(value)
    }
    function cleanForm(){
        setOldPassword('')
        setNewPassowrd('')
        setRepeatPass('')
    }
    async function submitNewPassword(evt) {
        evt.preventDefault();
        try {
            if (newPassword === repeatPass) {
                const resChangePassword = await apiBeyond.put(`/changePassword/${user.id}`, {
                    newPassword,
                    oldPassword
                })
                if (resChangePassword.data.data.message.statusCode == 200) {
                    setAlert({
                        ...myAlert,
                        show: true,
                        message: resChangePassword.data.data.message.observation,
                        status: 'success'
                    })
                    cleanForm()
                } else {
                    setAlert({
                        ...myAlert,
                        show: true,
                        message: resChangePassword.data.data.message.observation,
                        status: 'error'
                    })
                }
            } else {
                setAlert({
                    ...myAlert,
                    show: true,
                    message: 'As senhas digitadas não conferem',
                    status: 'error'
                })
            }
           
        } catch (error) {
            console.log('print de error em submitNewPassword => ', error)
            alert('Problema para alterar a senha')
        }

    }
    const classes = useStyles();
    return (
        <Paper className={classes.container} elevation={3}>
            <div className={classes.header}>
                <h3>Trocar de senha</h3>
            </div>
            <form className={classes.container2} onSubmit={() => false}>
                <TextField
                    label="Digite sua senha atual"
                    className={classes.item}
                    type="password"
                    onChange={e => handleOldPassword(e.target.value)}
                    value={oldPassword}
                   
                />
                <TextField
                    label="Digite sua nova senha"
                    className={classes.item}
                    type="password"
                    onChange={e => handleNewPassword(e.target.value)}
                    value={newPassword}
                 
                />
                <TextField
                    label="Repita sua nova senha"
                    className={classes.item}
                    type="password"
                    onChange={e => handleRepatPass(e.target.value)}
                    value={repeatPass}
                
                />
            </form>
            <Collapse in={myAlert.show} style={{ marginBottom: '0.5em' }}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlert({
                                    ...myAlert,
                                    show: false
                                });
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    severity={myAlert.status}
                >
                    {myAlert.message}
                </Alert>
            </Collapse>
            <Button onClick={submitNewPassword} variant="contained" color="primary" size="small">Mudar a senha</Button>
        </Paper>
    );
}

export default ChangePassword;