import React, { useState, useEffect, useContext, createContext } from 'react';

import {
    makeStyles, FormGroup, FormControlLabel, Switch, TextField, Paper,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
    Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    FormControl, Select, InputLabel
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ExpandMore, Edit, Delete, Save, CropRounded } from '@material-ui/icons';
import moment from 'moment';
import apiBeyond from '../../config/apiBeyond';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        alignItems: 'baseline',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '35%',
            justifyContent: 'space-between'
        }
    },
    filter: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    container: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'column'
    },
    item: {
        flex: 'auto',
        margin: '0.2em',
        '& select': {
            padding: '0.6em'
        }
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        maxHeight: '35em',
        paddingTop: '0.5em'
    },
    actionsForm: {
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start'
        },
        '& button': {
            [theme.breakpoints.up('sm')]: {
                marginRight: '0.5em'
            },
            marginBottom: '1em'
        }
    },
    'MuiExpansionPanelSummary-content.Mui-expanded': {
        margin: 0
    },
    'MuiExpansionPanelSummary-content': {
        margin: 0
    },
    bgPanelScheduling: {
        background: '#e5e5e5'
    },
    bgDetailsScheduling: {
        background: '#f5f5f5'
    },
}))

const SchedulingsContext = createContext({ data: {}, setData: () => false, load: () => false });

function SchedulingExpanded(props) {
    const { client, id, cod } = props;
    const classes = useStyles();
    const [editForm, setEditForm] = useState(false);
    const [infoSchedulings, setInfoSchedulings] = useState(props)
    const externalUsers = useSelector(state => state.externalUsersReducer.externalUsers)
    const [openModal, setOpenModal] = useState(false);
    const crud = useSelector(state => state.userReducer.user.permissions.find(permission => permission.entity[0].name == 'schedulings'))
    const [statusList, setStatusList] = useState(['pendente', 'ausente', 'cancelado', 'não localizado', 'não vendido', 'reagendar', 'recusado', 'vendido', 'conjuge ausente'])
    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const handleEditForm = () => {
        setEditForm(!editForm)
    }

    const handleInfoScheduling = (nameProp, value) => {
        setInfoSchedulings({
            ...infoSchedulings,
            [nameProp]: value
        })
    }

    const putScheduling = async () => {
        handleEditForm();
        try {
            const resPutScheduling = await apiBeyond.put(`/putScheduling/${id}`, infoSchedulings)
            alert(resPutScheduling.data.message.observation)
        } catch (error) {
            console.log('print de error em putScheduling => ', error);
            alert('PROBLEMA EM PUTSCHEDULING!!')
        }
    }

    function BuilderPermissions(index) {
        const arrComponents = [];
        const btnEdit = (key) => <Button key={key} size="small" variant="contained" color="primary" onClick={handleEditForm} startIcon={<Edit />}>Editar</Button>
        const btnSave = (key) => <Button key={key} size="small" variant="contained" color="primary" onClick={putScheduling} startIcon={<Save />}>Salvar</Button>
        const btnDelete = (key) => <Button key={key} size="small" variant="contained" color="secondary" onClick={handleOpenModal} startIcon={<Delete />}>Excluir</Button>
        if (crud.update) {
            if (!editForm) {
                arrComponents.push(btnEdit)
            } else {
                arrComponents.push(btnSave)
            }
        }
        if (crud.delete) {
            arrComponents.push(btnDelete)
        }
        return arrComponents;
    }

    return (
        <>
            <ExpansionPanel className={`${classes.item} ${classes.bgPanelScheduling}`}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                >
                    <div>
                        <Typography variant="subtitle2">{`codigo: ${cod}`}</Typography>
                        <Typography variant="overline">{client}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={`${classes.container} ${classes.bgDetailsScheduling}`}>
                    <div className={classes.actionsForm}>
                        {
                            BuilderPermissions().map((Components, index) => Components(index))
                        }
                    </div>
                    <div className={classes.form}>
                        <TextField
                            value={infoSchedulings.saleProbability}
                            label="Probabilidade de venda"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="dense"
                            onChange={e => handleInfoScheduling('saleProbability', e.target.value)}
                            required
                        />
                        <TextField
                            value={infoSchedulings.dateScheduling}
                            label="Data do agendamento"
                            disabled={!editForm}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            onChange={e => handleInfoScheduling('dateScheduling', e.target.value)}
                            required
                        />
                        <TextField
                            value={infoSchedulings.hourScheduling}
                            label="Hora"
                            disabled={!editForm}
                            type="time"
                            InputLabelProps={{
                                shrink: true
                            }}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            onChange={e => handleInfoScheduling('hourScheduling', e.target.value)}
                            required
                        />
                        <TextField
                            value={infoSchedulings.city || 'Cidade não informada corretamente!'}
                            label="Cidade"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            onChange={e => handleInfoScheduling('city', e.target.value)}
                            required
                        />
                        <TextField
                            value={infoSchedulings.age}
                            label="Idade"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            type="number"
                            margin="dense"
                            onChange={e => handleInfoScheduling('age', e.target.value)}
                            required
                        />
                        <FormControl className={classes.item} size="small">
                            <InputLabel shrink={true} variant="outlined" >
                                Estado Civil
                            </InputLabel>
                            <Select
                                variant="outlined"
                                value={infoSchedulings.civilState}
                                onChange={e => handleInfoScheduling('civilState', e.target.value)}
                                native
                                className={classes.item}
                                disabled={!editForm}
                            >
                                <option value="solteiro(a)">Solteiro(a)</option>
                                <option value="casado(a)">Casado(a)</option>
                                <option value="viuvo(a)">Viúvo(a)</option>
                                <option value="divorciado(a)">Divorciado(a)</option>
                                <option value="separado(a)">Separado(a)</option>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Conjugê"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.spouse}
                            onChange={e => handleInfoScheduling('spouse', e.target.value)}
                            required
                        />
                        <TextField
                            label="Idade do conjugê"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            type="number"
                            margin="dense"
                            value={infoSchedulings.ageSpouse ? infoSchedulings.ageSpouse : 0}
                            onChange={e => handleInfoScheduling('ageSpouse', e.target.value)}
                            required
                        />
                        <TextField
                            label="Telefone"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.telephone}
                            onChange={e => handleInfoScheduling('telephone', e.target.value)}
                            required
                        />
                        <TextField
                            label="Celular"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.cellphone}
                            onChange={e => handleInfoScheduling('cellphone', e.target.value)}
                            required
                        />
                        <TextField
                            label="Endereço"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            multiline
                            value={infoSchedulings.address}
                            onChange={e => handleInfoScheduling('address', e.target.value)}
                            required
                        />
                        <TextField
                            label="Profissão"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.profession}
                            onChange={e => handleInfoScheduling('profession', e.target.value)}
                            required
                        />
                        <TextField
                            label="Ponto de referência"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            multiline
                            value={infoSchedulings.referencePoint}
                            onChange={e => handleInfoScheduling('referencePoint', e.target.value)}
                            required
                        />
                        <TextField
                            label="Link do maps"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.linkMaps}
                            onChange={e => handleInfoScheduling('linkMaps', e.target.value)}
                            required
                        />
                        <FormControl className={classes.item} size="small">
                            <InputLabel shrink={true} variant="outlined" margin="dense">
                                Status
                            </InputLabel>
                            <Select
                                disabled={!editForm}
                                variant="outlined"
                                size="small"
                                value={infoSchedulings.status}
                                onChange={e => handleInfoScheduling('status', e.target.value)}
                                className={classes.item}
                                native={true}
                            >
                                {
                                    statusList.map((value, index) => <option key={index} value={value}>{value}</option>)
                                }
                            </Select>
                        </FormControl>
                        <Autocomplete
                            options={externalUsers}
                            getOptionLabel={(option) => option.name}
                            style={{ minWidth: '15em' }}
                            renderInput={(params) => <TextField {...params} label="Usuário Externo" variant="outlined" />}
                            size="small"
                            disabled={!editForm}
                            className={classes.item}
                            value={externalUsers.find(user => user.id == infoSchedulings.externalUser)}
                            onChange={(_, value) => {
                                if (value !== null) {
                                    handleInfoScheduling('externalUser', value.id)
                                }
                            }}
                            required
                        />
                        <TextField
                            label="Cadastrador por"
                            disabled={true}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.user[0].name}
                            required
                        />
                        <TextField
                            label="Observação"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            multiline
                            value={infoSchedulings.observation}
                            onChange={e => handleInfoScheduling('observation', e.target.value)}
                            required
                        />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ModalDelScheduling open={{ openModal, setOpenModal }} idScheduling={id} />
        </>
    )
}

//Modal de confirmação de exclusão

function ModalDelScheduling(props) {
    const { open, idScheduling } = props
    const { openModal, setOpenModal } = open;

    const listSchedulings = useContext(SchedulingsContext);

    const handleClose = () => {
        setOpenModal(!openModal)
    }

    const delScheduling = async () => {
        try {
            const resDelScheduling = await apiBeyond.delete(`/delScheduling/${idScheduling}`)
            if (resDelScheduling.data.message.statusCode == 200) {
                listSchedulings.load();
            }
            alert(resDelScheduling.data.message.observation);
            handleClose();
        } catch (error) {
            console.log('print de error em delScheduling => '.error)
            alert('PROBLEMA AO EXCLUIR AGENDAMENTO')
        }
    }

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Tem certeza que quer EXCLUIR o agendamento?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Ao excluir um agendamento, todas as informações que dependem dele serão excluídas, como
                    VENDAS, dados do CLIENTE, etc ..
                    A operação NÃO poderá ser desfeita!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Cancelar
                </Button>
                <Button onClick={delScheduling} color="secondary" autoFocus variant="contained">
                    Ok, eu entendo e quero continuar.
          </Button>
            </DialogActions>
        </Dialog>
    )
}

function SchedulingSelect() {
    const classes = useStyles();
    const userLogged = useSelector(state => state.userReducer.user.data)
    const userPermissions = useSelector(state => state.userReducer.user.permissions)
    const [schedulings, setSchedulings] = useState([]);
    const [initialDate, setInitialDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));
    const [codScheduling, setCodScheduling] = useState('');
    const [client, setClient] = useState('');
    const [typeDate, setTypeDate] = useState({
        enable: false,
        content: 'dateScheduling'
    });

    const handleInitialDate = (value) => {
        setInitialDate(value)
    }
    const handleFinalDate = (value) => {
        setFinalDate(value)
    }
    const handleCodScheduling = (value) => {
        setCodScheduling(value)
    }
    const handleClient = (value) => {
        setClient(value)
    }
    const handleTypeDate = () => {
        setTypeDate(prevState => {
            if (prevState.enable == false) {
                return {
                    enable: true,
                    content: 'createdAt'
                }
            } else if (prevState.enable == true) {
                return {
                    enable: false,
                    content: 'dateScheduling'
                }
            }
        })
    }
    const getSchedulings = async () => {
        try {
            const resSchedulings = await apiBeyond.get('/getSchedulingsByFilters', {
                params: {
                    initialDate,
                    finalDate,
                    typeDate: typeDate.content,
                    idScheduling: codScheduling,
                    client,
                    userId: userLogged.id,
                    all: String(userPermissions.find(permission => permission.entityId == 1).all) //1(um) é o ID da funcionalidade 'agendamentos' no backend
                }
            })
            if (resSchedulings.data.message.statusCode == 200) {
                setSchedulings(resSchedulings.data.data)
            }
        } catch (error) {
            console.log('print de error em getSchedulings => ', error)
            alert('Problema para selecionar os agendamentos')
        }
    }
    useEffect(() => {
        getSchedulings()
    }, [initialDate, finalDate, codScheduling, client, typeDate])

    return (
        <Paper className={classes.container} elevation={3}>
            <div className={`${classes.header} ${classes.item}`}>
                <h3>Seleção de agendamentos</h3>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch onChange={handleTypeDate} />}
                        label="Data de cadastro"
                    />
                </FormGroup>
            </div>
            <div className={`${classes.filter} ${classes.item}`}>
                <TextField
                    type="date"
                    label="De"
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.item}
                    variant="outlined"
                    required
                    margin="dense"
                    value={initialDate}
                    onChange={e => handleInitialDate(e.target.value)}
                />
                <TextField
                    type="date"
                    label="Até"
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.item}
                    variant="outlined"
                    required
                    margin="dense"
                    value={finalDate}
                    onChange={e => handleFinalDate(e.target.value)}
                />

                <TextField
                    label="código"
                    type="number"
                    variant="outlined"
                    className={classes.item}
                    margin="dense"
                    value={codScheduling}
                    onChange={e => handleCodScheduling(e.target.value)}
                />
                <TextField
                    label="Nome do cliente"
                    variant="outlined"
                    className={classes.item}
                    margin="dense"
                    value={client}
                    onChange={e => handleClient(e.target.value)}
                />
            </div>
            <div className={classes.item} >
                <SchedulingsContext.Provider value={{ data: schedulings, setData: setSchedulings, load: getSchedulings }}>
                    {schedulings.map((scheduling, index) =>
                        <SchedulingExpanded key={scheduling.id || index} {...scheduling} />
                    )}
                </SchedulingsContext.Provider>
            </div>
        </Paper>
    );
}

export default SchedulingSelect;