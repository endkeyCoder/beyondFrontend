import React, { useState, useEffect } from 'react';

import {
    makeStyles, FormGroup, FormControlLabel, Switch, TextField, Paper,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
    Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ExpandMore, Edit, Delete, Save } from '@material-ui/icons';
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
    }
}))

function SchedulingExpanded(props) {
    console.log('print de props em SchedulingExpanded => ', props)
    const { client, id } = props;
    const classes = useStyles();
    const [editForm, setEditForm] = useState(false);
    const [infoSchedulings, setInfoSchedulings] = useState(props)
    const externalUsers = useSelector(state => state.externalUsersReducer.externalUsers)
    const [openModal, setOpenModal] = useState(false);

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

    return (
        <>
            <ExpansionPanel className={`${classes.item} ${classes.bgPanelScheduling}`}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                >
                    <div>
                        <Typography variant="subtitle2">{`codigo: ${id}`}</Typography>
                        <Typography variant="overline">{client}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={`${classes.container} ${classes.bgDetailsScheduling}`}>
                    <div className={classes.actionsForm}>
                        {
                            !editForm ?
                                <Button size="small" variant="contained" color="primary" onClick={handleEditForm} startIcon={<Edit />}>Editar</Button> :
                                <Button size="small" variant="contained" color="primary" onClick={putScheduling} startIcon={<Save />}>Salvar</Button>
                        }
                        <Button size="small" variant="contained" color="secondary" onClick={handleOpenModal} startIcon={<Delete />}>Excluir</Button>
                    </div>
                    <div className={classes.form}>
                        <TextField
                            value={infoSchedulings.saleProbability || 'Problema!'}
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
                            value={infoSchedulings.dateScheduling || 'Problema!'}
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
                            value={infoSchedulings.hourScheduling || 'Problema!'}
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
                            value={infoSchedulings.city || 'Problema!'}
                            label="Cidade"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            onChange={e => handleInfoScheduling('city', e.target.value)}
                            required
                        />
                        <TextField
                            value={infoSchedulings.age || 'Problema!'}
                            label="Idade"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            type="number"
                            margin="dense"
                            onChange={e => handleInfoScheduling('age', e.target.value)}
                            required
                        />
                        <TextField
                            label="Estado Civil"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            select={true}
                            style={{ minWidth: '8em' }}
                            value={infoSchedulings.civilState || 'Problema!'}
                            onChange={e => handleInfoScheduling('civilState', e.target.value)}
                            required
                        >
                            <option value="solteiro(a)">Solteiro(a)</option>
                            <option value="casado(a)">Casado(a)</option>
                            <option value="viuvo(a)">Viúvo(a)</option>
                            <option value="divorciado(a)">Divorciado(a)</option>
                            <option value="separado(a)">Separado(a)</option>
                        </TextField>
                        <TextField
                            label="Conjugê"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.spouse || 'Problema!'}
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
                            value={infoSchedulings.telephone || 'Problema!'}
                            onChange={e => handleInfoScheduling('telephone', e.target.value)}
                            required
                        />
                        <TextField
                            label="Celular"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.cellphone || 'Problema!'}
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
                            value={infoSchedulings.address || 'Problema!'}
                            onChange={e => handleInfoScheduling('address', e.target.value)}
                            required
                        />
                        <TextField
                            label="Profissão"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.profession || 'Problema!'}
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
                            value={infoSchedulings.referencePoint || 'Problema!'}
                            onChange={e => handleInfoScheduling('referencePoint', e.target.value)}
                            required
                        />
                        <TextField
                            label="Link do maps"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            value={infoSchedulings.linkMaps || 'Problema!'}
                            onChange={e => handleInfoScheduling('linkMaps', e.target.value)}
                            required
                        />
                        <TextField
                            label="status"
                            disabled={!editForm}
                            className={classes.item}
                            variant="outlined"
                            margin="dense"
                            select={true}
                            style={{ minWidth: '9em' }}
                            value={infoSchedulings.status || 'Problema!'}
                            onChange={e => handleInfoScheduling('status', e.target.value)}
                            required
                        >
                            <option value="Agendado">Agendado</option>
                            <option value="pendente">Pendente</option>
                            <option value="vendido">Vendido</option>
                            <option value="não vendido">Não vendido</option>
                        </TextField>
                        <Autocomplete
                            options={externalUsers}
                            getOptionLabel={(option) => option.name}
                            style={{ minWidth: '15em' }}
                            renderInput={(params) => <TextField {...params} label="Usuário Externo" variant="outlined" />}
                            size="small"
                            disabled={!editForm}
                            className={classes.item}
                            value={externalUsers.find(user => user.id == infoSchedulings.externalUser)}
                            onChange={(_, value) => handleInfoScheduling('externalUser', value.id)}
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

function ModalDelScheduling({ open, idScheduling }) {
    const { openModal, setOpenModal } = open;
    const handleClose = () => {
        setOpenModal(!openModal)
    }

    const delScheduling = async () => {
        try {
            const resDelScheduling = await apiBeyond.delete(`/delScheduling/${idScheduling}`)
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
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={delScheduling} color="secondary" autoFocus>
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
            const resSchedulings = await apiBeyond.get('/getSchedulingByIdOrClient', {
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
    console.log('print de schedulings => ', schedulings)
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
                {schedulings.map((scheduling, index) => <SchedulingExpanded key={scheduling.id || index} {...scheduling} />)}
            </div>
        </Paper>
    );
}

export default SchedulingSelect;