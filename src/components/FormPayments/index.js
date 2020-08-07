import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Button,
    Input,
    makeStyles,
    TextField,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Slide,
    Snackbar,
} from '@material-ui/core';
import { Payment, Save, Cancel, Create, AddCircle, Close } from '@material-ui/icons';
import MaskedInput from 'react-text-mask';

import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles((theme) => ({
    headerSetting: {
        borderRadius: '10px 10px 0 0',
        padding: '0.5em',
        borderBottom: '1px solid #050505',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    containerSetting: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: '1em'
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: '2%'
        },
        flex: 1
    },
    bodySetting: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0.5em'
    },
    bodyItem: {
        display: 'flex',
    },
    footerSetting: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '0.5em',
        [theme.breakpoints.down('xs')]: {
            '& button': {
                marginRight: '3%',
            }
        },
        '& button': {
            marginRight: '1%',
        }
    },
    marginDefault: {
        marginBottom: '1em'
    }
}))

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, ',', /[0-9]/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

export default function FormPayments() {
    const [formPaymentState, setFormPaymentState] = useState([]);
    const [editing, setEditing] = useState(false);
    const [deletedFromPayments, setDeletedFromPayments] = useState([])
    const [snackStatus, setSnackStatus] = useState({
        open: false,
        transition: Slide,
        message: ''
    })

    async function loadFormPayments() {
        try {
            const resGetAllFormPayments = await apiBeyond.get('/getAllFormPayments');
            if (resGetAllFormPayments.data.data.length <= 0) {
                return false;
            } else {
                setFormPaymentState(resGetAllFormPayments.data.data)
            }
        } catch (error) {
            console.log('print error em loadFormPayments => ', error)
            alert('Erro ao tentar carregar formas de pagamento')
        }
    }

    function handleTitle(title, id) {
        setFormPaymentState((prevState) => {
            const data = [...prevState];
            const newState = data.map(formPayment => {
                if (formPayment.id == id) {
                    formPayment.title = title
                }
                return formPayment
            })
            return newState
        })
    }

    function handleRate(rate, id) {
        setFormPaymentState((prevState) => {
            const data = [...prevState];
            const newState = data.map(formPayment => {
                if (formPayment.id == id) {
                    formPayment.rate = rate
                }
                return formPayment
            })
            return newState
        })
    }

    function showFormPayments() {

        return formPaymentState.map(formPayment => {
            return (
                <div key={formPayment.id} className={classes.bodyItem}>
                    <TextField
                        id={formPayment.id}
                        label="Descrição"
                        value={formPayment.title}
                        required
                        onChange={(e) => handleTitle(e.target.value, e.target.id)}
                        disabled={!editing}
                    />
                    <FormControl>
                        <InputLabel htmlFor="rateFormPayment">Taxa</InputLabel>
                        <Input
                            id={formPayment.id}
                            value={formPayment.rate}
                            onChange={(e) => handleRate(e.target.value, e.target.id)}
                            disabled={!editing}
                            type="number"
                            endAdornment={
                                <InputAdornment id={formPayment.id} position="end">
                                    <IconButton disabled={!editing} id={formPayment.id} onClick={(e) => handleDeleteFormPayment(e, e.target.id)}>
                                        <Close id={formPayment.id} fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            )
        })
    }

    function handleAddFormPayment(e) {
        e.preventDefault();
        setFormPaymentState((prevState) => {
            const data = [...prevState]
            data.push({ title: "", rate: 0, id: `idTemp-${Math.floor(Math.random() * 1000)}`, idTemp: true })
            return data;
        })
        setEditing(true)
    }

    function handleDeleteFormPayment(e, idFormPayment) {
        e.preventDefault();

        if (idFormPayment) {
            setFormPaymentState((prevState) => {
                const data = [...prevState];
                const newState = data.map(formPayment => {
                    if (formPayment.id == idFormPayment) {
                        setDeletedFromPayments((prevDeletedState) => {
                            const dataDeleted = [...prevDeletedState];
                            dataDeleted.push(formPayment)
                            return dataDeleted
                        })
                        data[data.indexOf(formPayment)] = undefined;
                        return false
                    }
                    return formPayment
                })

                newState.splice((newState.indexOf(false)), 1)
                return newState
            })
        }
    }

    function handleEditing(e) {
        e.preventDefault();
        setEditing(true)
    }

    function handleCloseSnack() {
        setSnackStatus({
            ...snackStatus,
            open: false
        })
    }

    function handleOpenSnack(message) {
        setSnackStatus({
            ...snackStatus,
            open: true,
            message: message
        })
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            const dataFormPayments = formPaymentState.map(formPayment => {
                if ('idTemp' in formPayment) {
                    formPayment.idTemp = undefined;
                    formPayment.id = undefined;
                }
                return formPayment;
            });
            const resSetFormPayments = await apiBeyond.post('/setformPayments', {
                dataFormPayments,
                deletedFromPayments
            })
            if (resSetFormPayments.data.message.statusCode == 200) {
                loadFormPayments()
                setEditing(false)
            }
            handleOpenSnack(resSetFormPayments.data.message.observation)
            console.log(resSetFormPayments.data)
        } catch (error) {
            console.log('print de error em handleSave => ', error)
            alert('Problema')
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        loadFormPayments();
        setEditing(false);
        setDeletedFromPayments([])
    }

    useEffect(() => {
        if (formPaymentState.length <= 0 && deletedFromPayments.length <= 0) {
            loadFormPayments()
        }
    })

    const classes = useStyles();

    return (
        <Paper className={`${classes.containerSetting} ${classes.marginDefault}`} elevation={3}>
            <div className={classes.headerSetting}>
                <div style={{ display: 'flex' }}>
                    <Payment />
                    <Typography variant="overline"> Formas de pagamento</Typography>
                </div>
                <IconButton onClick={handleAddFormPayment} style={{ color: 'rgba(0,0,0,1)' }}>
                    <AddCircle />
                </IconButton>
            </div>
            <div className={classes.bodySetting}>
                {
                    showFormPayments()
                }
            </div>
            <div className={classes.footerSetting}>
                <Button onClick={handleSave} variant="contained" startIcon={<Save />}>Salvar</Button>
                <Button onClick={handleEditing} variant="contained" startIcon={<Create />}>Editar</Button>
                <Button disabled={!editing} onClick={handleCancel} variant="contained" startIcon={<Cancel />}>Cancelar</Button>
            </div>
            <Snackbar
                open={snackStatus.open}
                onClose={handleCloseSnack}
                TransitionComponent={snackStatus.transition}
                message={snackStatus.message}
            />
        </Paper>
    );
}
