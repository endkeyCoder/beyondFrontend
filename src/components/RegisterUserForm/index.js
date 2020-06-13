import React, { useState, useEffect } from 'react';
import apiBeyond from '../../config/apiBeyond';
import { Link } from 'react-router-dom';
import { TextField, Paper, Button, Typography, makeStyles, FormControl, FormHelperText, Select, InputLabel } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
const UseStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexWrap: 'wrap',
        alignItems: 'baseline'
    },
    item: {
        marginBottom: '0.7em',
        flex: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: '0.7em',
        }
    },
    container2: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'column'
    },
    button: {
        maxHeight: '5em'
    }
}))

export default function RegisterUserForm() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [groups, setGroups] = useState([]);
    const [idGroup, setIdGroup] = useState(1)

    function handleNick(nick) {
        setNick(nick)
    }
    function handlePassword(password) {
        setPassword(password)
    }
    function handleName(name) {
        setName(name)
    }
    function handleEmail(email) {
        setEmail(email)
    }
    function handleConfirmPassword(confirmPassword) {
        setConfirmPassword(confirmPassword)
    }
    function handleIdGroup(idGroup) {
        setIdGroup(idGroup)
    }
    async function register(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const res = await apiBeyond.post('/setUser', {
                    nick,
                    password,
                    name,
                    email,
                    status: 'pendente',
                    block: true,
                    groupId: idGroup
                })

                alert(res.data.message.observation);
            } catch (error) {
                console.log(error)
                alert('problema ao tentar efetuar o cadastro')
            }
        } else {
            alert('senhas não conferem')
        }
    }

    useEffect(() => {
        async function loadGroups() {
            try {
                const resLoadGroups = await apiBeyond.get('/getAllUserGroups')
                if (resLoadGroups.data.data.length !== groups.length) {
                    setGroups(resLoadGroups.data.data)
                }
            } catch (error) {
                console.log('print de error em loadGroups => ', error)
                alert('problema ao carregar os grupos')
            }
        }
        loadGroups();
    })
    const classes = UseStyles();
    return (
        <Paper className={classes.container2} elevation={3}>
            <div><Typography variant="h5">Cadastro de usuário</Typography></div>
            <form className={classes.container} onSubmit={register}>
                <TextField
                    label="Nome"
                    placeholder="Nome completo"
                    required
                    value={name}
                    onChange={e => handleName(e.target.value)}
                    className={classes.item}
                />
                <TextField
                    label="Nick"
                    placeholder="Nome de usuário"
                    required
                    value={nick}
                    onChange={e => handleNick(e.target.value)}
                    className={classes.item}
                />
                <TextField
                    label="Senha"
                    type="password"
                    required
                    value={password}
                    onChange={e => handlePassword(e.target.value)}
                    className={classes.item}
                />
                <TextField
                    label="Senha novamente"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => handleConfirmPassword(e.target.value)}
                    className={classes.item}
                />
                <FormControl className={classes.item}>
                    <TextField
                        label="Email"
                        placeholder="Email válido"
                        type="email"
                        required
                        value={email}
                        onChange={e => handleEmail(e.target.value)}
                    />
                    <FormHelperText><Typography variant="subtitle2">O email será usado para recuperação de senha</Typography></FormHelperText>
                </FormControl>
                <FormControl style={{ minWidth: '8em' }} className={classes.item}>
                    <InputLabel shrink={true}>Grupo</InputLabel>
                    <Select onChange={(e) => handleIdGroup(e.target.value)} native>
                        <option value=''>Selecione um grupo</option>
                        {
                            groups.map(group => {
                                const { name, id } = group;
                                return (
                                    <option key={name + id} value={id}>{name}</option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Button className={classes.button} type="submit" variant="contained" color="primary" size="small" startIcon={<PersonAdd />}>
                    Cadastrar
                </Button>
            </form>
        </Paper>
    );
}
