import React, { useState, useEffect } from 'react';
import {
    Paper, IconButton, Typography, TextField, makeStyles,
    InputLabel, FormControl, Select, Divider, RadioGroup, Radio, FormControlLabel
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Refresh } from '@material-ui/icons';
import moment from 'moment';
import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.3em',
        background: '#D3D3D3',
        alignItems: 'center',
        borderRadius: '5px 5px 0 0'
    },
    body: {
        display: 'flex',
        padding: '0.5em',
        flexDirection: 'column'
    },
    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    infos: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1em'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    item: {
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }
}))

function AuditGenereal() {
    const classes = useStyles();
    const [usergroups, setUsergroups] = useState([
        {
            id: '',
            name: 'Todos',
            default: true
        },
    ]);
    const [users, setUsers] = useState([
        {
            id: '',
            name: 'Todos',
            nick: '',
            groupId: '',
            default: true
        },
    ])
    const [initialDate, setInitialDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));
    const [groupSelected, setGroupSelected] = useState('');
    const [userSelected, setUserSelected] = useState({
        id: '',
        name: '',
        nick: '',
        groupId: ''
    });
    const [info, setInfo] = useState({
        totRegisteredSchedulings: 0,
        totSales: 0,
        percentageMadeSales: '0%',
        valueSales: 0,
        averageTicket: 0,
        totSchedulingsAttended: 0,
        directedSchedulings: 0
    })

    const handleInitialDate = (value) => {
        setInitialDate(value)
    }
    const handleFinalDate = (value) => {
        setFinalDate(value);
    }
    const handleUserSelected = (value) => {
        console.log('print de value em handleUserSelected => ', value)
        if (value == "" || value == null) {
            const defaultUserSelected = {
                id: '',
                name: '',
                nick: ''
            }
            setUserSelected(defaultUserSelected)
        } else {
            setUserSelected(value)
        }

    }
    const handleGroupSelected = (value) => {
        setGroupSelected(value)
    }
    const loadGroups = async () => {
        try {
            const resGroups = await apiBeyond.get('/getAllUserGroups');

            if (resGroups.data.message.statusCode == 200) {
                resGroups.data.data.unshift(usergroups[0])
                resGroups.data.data[0].default = false
                setUsergroups(resGroups.data.data)
            }
        } catch (error) {
            console.log('print de error em loadGroups => ', error);
            alert('Problema para carregar os grupos de usuário')
        }
    }
    const loadUsers = async () => {
        try {
            const resUsers = await apiBeyond.get('/getAllUsers');
            if (resUsers.data.message.statusCode == 200) {
                const usersByGroup = resUsers.data.data.filter(user => {
                    if (groupSelected == "") {
                        return user;
                    } else {
                        return user.groupId == groupSelected
                    }
                })
                resUsers.data.data.unshift(users[0]);
                resUsers.data.data[0].default = false;
                setUsers(usersByGroup)
            }
        } catch (error) {
            console.log('print de error em loadUsers => ', error);
            alert('Problema para carregar os usuários')
        }
    }
    const getAuditResume = async () => {
        try {
            const resGetAuditResume = await apiBeyond.get(`/getAuditResume`, {
                params: { initialDate, finalDate, groupId: groupSelected, userId: userSelected.id }
            })
            if (resGetAuditResume.data.message.statusCode == 200) {
                console.log('print de resGetAuditResume => ', resGetAuditResume.data)
                setInfo(resGetAuditResume.data.data)
            }
        } catch (error) {
            console.log('print de error em getAuditResume => ', error);
            alert('Problema em getAuditResume')
        }
    }
    useEffect(() => {
        if (usergroups[0].default) {
            loadGroups()
        }
        if (users[0].default) {
            loadUsers()
        }
    })
    useEffect(() => {
        getAuditResume();
        loadUsers();
    }, [initialDate, finalDate, groupSelected, userSelected])


    return (
        <Paper elevation={3} className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h6">Geral</Typography>
                <IconButton color="default" onClick={getAuditResume}>
                    <Refresh />
                </IconButton>
            </div>
            <div className={classes.body}>
                <div className={classes.filters}>

                    <TextField
                        label="De"
                        InputLabelProps={{
                            shrink: true
                        }}
                        type="date"
                        className={classes.item}
                        value={initialDate}
                        onChange={e => handleInitialDate(e.target.value)}
                    />
                    <TextField
                        label="Até"
                        InputLabelProps={{
                            shrink: true
                        }}
                        type="date"
                        className={classes.item}
                        value={finalDate}
                        onChange={e => handleFinalDate(e.target.value)}
                    />
                    <Autocomplete
                        options={users}
                        getOptionLabel={option => option.name}
                        getOptionSelected={option => option.id}
                        renderOption={option => (
                            <>
                                <Typography style={{ marginRight: '0.5em' }} variant="subtitle2">{option.nick}</Typography>
                                <Typography variant="subtitle1">{option.name}</Typography>
                            </>
                        )}
                        debug
                        renderInput={params => <TextField {...params} label="Usuário" />}
                        className={classes.item}
                        style={{ minWidth: '10em' }}
                        value={userSelected}
                        onChange={(e, value) => handleUserSelected(value)}
                        noOptionsText="Usuário não existe"
                    />
                    <FormControl className={`${classes.formControl} ${classes.item}`}>
                        <InputLabel shrink={true}>
                            Grupo
                        </InputLabel>
                        <Select value={groupSelected} onChange={e => handleGroupSelected(e.target.value)} native>
                            {
                                usergroups.map(group => (<option key={group.id} value={group.id}>{group.name}</option>))
                            }
                        </Select>
                    </FormControl>

                </div>
                <Divider />
                <div className={classes.infos}>
                    <TextField
                        label="Agendamentos cadastrados"
                        value={info.totRegisteredSchedulings}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                    <TextField
                        label="Agendamentos Atendidos"
                        value={info.totSchedulingsAttended}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                    <TextField
                        label="Agendamentos Direcionados"
                        value={info.directedSchedulings}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                    <TextField
                        label="Total de vendas"
                        value={info.totSales}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                    <TextField
                        label="Conversão de vendas %"
                        value={info.percentageMadeSales}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        label="Valor das vendas $"
                        value={info.valueSales}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                    <TextField
                        label="Ticket Médio $"
                        value={info.averageTicket}
                        InputProps={{
                            disableUnderline: true,
                            disabled: true
                        }}
                    />
                </div>
            </div>
        </Paper>
    );
}

export default AuditGenereal;