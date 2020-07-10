import React, { useState, useEffect } from 'react'
import {
    Paper, InputAdornment, TextField, Typography, Button, IconButton, ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelDetails, makeStyles
} from '@material-ui/core';
import { Search, Lock, LockOpen, ExpandMore, ExpandLess, Save, Edit } from '@material-ui/icons';
import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles(theme => ({
    containerCol: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5em',
        justifyContent: 'space-evenly',
        flex: 'auto'
    },
    containerRow: {
        display: 'flex',
        alignItems: 'center',
        flex: 'auto',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        padding: '1em'
    },
    item: {
        margin: '0.2em 0 0.3em 0',
        flex: 'auto'
    },

}))

function UserPanel(props) {
    const { id } = props.dataUser
    const [dataUser, setDataUser] = useState(props.dataUser)
    const [editing, setEditing] = useState(false);

    const handleDataUser = (nameProp, valueProp) => {
        setDataUser({
            ...dataUser,
            [nameProp]: valueProp
        })
    }

    const handleEditing = () => {
        setEditing(!editing)
    }

    const putUser = async (evt) => {
        evt.preventDefault();
        try {
            if (dataUser.name !== '' && dataUser.email !== '') {
                const resPutUser = await apiBeyond.put(`/putUser/${id}`, dataUser)
                handleEditing(!editing)
                alert(resPutUser.data.message.observation)
            } else {
                alert('Todos os campos devem ser preenchidos')
            }
        } catch (error) {
            console.log('print de error em putUser => ', error)
            alert('Problema ao tentar atualizar informações do usuário')
        }
    }

    const blockUser = async () => {
        try {
            const resBlockUser = await apiBeyond.put(`/blockUser/${id}`)
            if (resBlockUser.data.message.statusCode == 200) {
                handleDataUser('block', !dataUser.block)
            }
        } catch (error) {
            console.log('print de error em blockUser => ', error)
            alert('Problema ao tentar bloquear o usuário')
        }
    }

    const classes = useStyles();
    return (
        <ExpansionPanel elevation={1}>
            <ExpansionPanelSummary className={classes.containerRow} expandIcon={<ExpandMore />}>
                <div className={classes.containerRow}>
                    <Typography variant="subtitle1">{dataUser.name}</Typography>
                    <IconButton>
                        {
                            dataUser.block ?
                                <Lock
                                    onClick={blockUser}
                                /> :
                                <LockOpen
                                    onClick={blockUser}
                                />
                        }
                    </IconButton>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={classes.containerCol}>
                    <div className={`${classes.containerRow} ${classes.item}`}>
                        {
                            editing ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Save />}
                                    size="small"
                                    type="submit"
                                    onClick={putUser}
                                >Salvar</Button> :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Edit />}
                                    onClick={handleEditing}
                                    size="small"
                                >
                                    Editar
                            </Button>
                        }
                    </div>
                    <form className={`${classes.containerRow} ${classes.inputsContainer}`} onSubmit={putUser}>
                        <TextField
                            label="nome"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={dataUser.name}
                            onChange={e => handleDataUser('name', e.target.value)}
                            disabled={!editing}
                            className={classes.item}
                            required
                        />
                        <TextField
                            label="email"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={dataUser.email}
                            onChange={e => handleDataUser('email', e.target.value)}
                            disabled={!editing}
                            className={classes.item}
                            required
                            type="email"
                        />
                    </form>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

function UserEdit() {
    const [usersList, setUserList] = useState([]);
    const [usersListFilter, setUserListFilter] = useState([]);
    const [doQuery, setDoQuery] = useState(true);

    const loadUsers = async () => {
        setDoQuery(false)
        try {
            const resGetAllUsers = await apiBeyond.get('/getAllUsers');
            if (resGetAllUsers.data.message.statusCode == 200) {
                setUserList(resGetAllUsers.data.data)
                setUserListFilter(resGetAllUsers.data.data)
            }
        } catch (error) {
            console.log('print de error em UserEdit => ', error)
            alert('Problema ao tentar carregar usuarios')
        }
    }
    const filterUsers = (value) => {
        if (value !== '') {
            setUserListFilter(usersList.filter(user => String(user.name).toLowerCase().startsWith(value) || String(user.name).toUpperCase().startsWith(value)))
        } else {
            setUserListFilter(usersList)
        }
    }
    useEffect(() => {
        if (doQuery) {
            loadUsers()
        }
    }, [doQuery])
    const classes = useStyles();
    return (
        <Paper elevation={3}>
            <div className={classes.header}>
                <Typography variant="h5">Edição e Bloqueio</Typography>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    onChange={e => filterUsers(e.target.value)}
                />
            </div>
            <div>
                {
                    usersListFilter.map(user => <UserPanel key={user.id} dataUser={user} />)
                }
            </div>
        </Paper>
    )
}

export default UserEdit