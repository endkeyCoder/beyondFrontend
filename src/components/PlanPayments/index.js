import React, { useState, useEffect } from 'react';
import apiBeyond from '../../config/apiBeyond';

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
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    FormControlLabel,
    Switch,
    Divider
} from '@material-ui/core';
import { Save, Cancel, Create, AddCircle, Close, LibraryBooks, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    headerSetting: {
        borderRadius: '10px 10px 0 0',
        padding: '0.5em',
        borderBottom: '1px solid #050505',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    containerSetting: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        flex: 1
    },
    bodySetting: {
        background: '#f1f1f1',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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
    marginDefault:{
        marginBottom: '1em'
    }
}))

export default function PlanPayments() {
    const [expanded, setExpanded] = useState(false);
    const [planPayments, setPlanPayments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [reqs, setReqs] = useState({
        postPlanPayment: false,
    });
    const [deletedPlanPayments, setDeletedPlanPayments] = useState([])

    const handleChange = (panel) => {
        if (panel === expanded) {
            setExpanded(false)
        } else {
            setExpanded(panel)
        }
    };

    const handleEditing = () => {
        setEditing(true);
    }

    const handleSave = async () => {
        try {
            const dataPlanPayments = planPayments.map(planPayment => {
                planPayment.title = planPayment.inputTitle
                return planPayment
            })

            const resPlanPayments = await apiBeyond.post('/setPlanPayments', {
                dataPlanPayments,
                deletedPlanPayments
            })
            if (resPlanPayments.data.message.statusCode !== 200) {
                setReqs({ postPlanPayment: false })
            }
            loadPlayPayments()
            setEditing(false);
        } catch (error) {
            console.log('print de error em handleSave => ', error);
            alert('Problema pra salvar!!!')
        }
    }

    function handleAddPlanPayment(e) {
        e.preventDefault();
        function generateId() {
            if (planPayments.length <= 0) {
                return 1
            } else {
                return parseInt(planPayments[(planPayments.length - 1)].id) + 1
            }
        }

        setPlanPayments(prevState => {
            const data = [...prevState]
            data.push({
                id: generateId(),
                title: `Forma de pagamento ${generateId()}`,
                qttPlots: 1,
                entry: true,
                inputTitle: `Forma de pagamento ${generateId()}`
            })
            return data
        })
        setReqs({ postPlanPayment: true })
    }

    const loadPlayPayments = async () => {
        try {
            const resPlanPayments = await apiBeyond.get('/getAllPlanPayments')
            if (resPlanPayments.data.message.statusCode == 200) {
                if (resPlanPayments.data.data <= 0) {
                    return false
                } else {
                    setReqs({ postPlanPayment: false })
                    setPlanPayments(resPlanPayments.data.data.map(planPayment => {
                        planPayment.inputTitle = planPayment.title
                        return planPayment
                    }))
                }
            }
        } catch (error) {
            console.log('print de error em handleSave PlanPayments => ', error)
            alert('Problemas em PlanPayments!!!')
        }
    }

    function handleTitle(title, id) {
        setPlanPayments((prevState) => {
            const data = [...prevState];
            const newState = data.map(planPayment => {
                if (planPayment.id == id) {
                    planPayment.inputTitle = title
                }
                return planPayment
            })
            return newState
        })
    }

    function handleEntry(entry, id) {
        setPlanPayments((prevState) => {
            const data = [...prevState];
            const newState = data.map(planPayment => {
                if (planPayment.id == id) {
                    planPayment.entry = entry
                }
                return planPayment
            })
            return newState
        })
    }

    function handleQttPlots(qttPlots, id) {
        setPlanPayments((prevState) => {
            const data = [...prevState];
            const newState = data.map(planPayment => {
                if (planPayment.id == id) {
                    planPayment.qttPlots = qttPlots
                }
                return planPayment
            })
            return newState
        })
    }

    function handleDeletedPlanPayments(e, idPlanPayment) {
        e.preventDefault();

        if (idPlanPayment) {
            setPlanPayments((prevStatePlanPayment) => {
                const dataPlanPayments = [...prevStatePlanPayment]
                const newPlanPayment = dataPlanPayments.map(planPayment => {
                    if (planPayment.id == idPlanPayment) {
                        setDeletedPlanPayments((prevDeletedState) => {
                            const dataDeleted = [...prevDeletedState];
                            dataDeleted.push(planPayment)
                            return dataDeleted
                        })
                        dataPlanPayments[dataPlanPayments.indexOf(planPayment)] = undefined;
                        return false
                    }
                    return planPayment
                })
                newPlanPayment.splice((newPlanPayment.indexOf(false)), 1)
                return newPlanPayment
            })
            setReqs({ postPlanPayment: true })
        }
    }

    function handleCancel() {
        setEditing(false)
        loadPlayPayments();
    }

    useEffect(() => {
        if (planPayments.length <= 0 && deletedPlanPayments.length <= 0) {
            loadPlayPayments()
        }
        if (reqs.postPlanPayment) {
            handleSave();
        }
    })


    const classes = useStyles();

    function ListPlanPayments() {
        return planPayments.map((planPayment, index) => (
            <ExpansionPanel key={planPayment.title} expanded={expanded === planPayment.title} onChange={(e) => handleChange(e.currentTarget.id)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore data-panel={planPayment.title} />}
                    aria-controls="panel1bh-content"
                    id={planPayment.title}
                >
                    <Typography variant="overline">{planPayment.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.bodySetting}>
                    <FormControlLabel
                        control={<Switch
                            checked={planPayment.entry}
                            onChange={(e) => handleEntry(e.target.checked, e.target.id)}
                            size="small"
                            id={planPayment.id}
                        />}
                        label="Entrada"
                        disabled={!editing}
                        id={planPayment.id}
                    />
                    <IconButton id={planPayment.id} onClick={(e) => handleDeletedPlanPayments(e, e.target.id)}><Close id={planPayment.id} fontSize="small" /></IconButton>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                        <TextField
                            label="Quantidade de parcelas"
                            variant="outlined"
                            InputProps={{
                                readOnly: !editing,
                                value: planPayment.qttPlots,
                                type: 'number',
                                id: planPayment.id
                            }}
                            id={planPayment.id}
                            onChange={(e) => handleQttPlots(e.target.value, e.target.id)}
                        />
                        <TextField
                            label="Título"
                            variant="outlined"
                            InputProps={{
                                readOnly: !editing,
                                value: planPayment.inputTitle,
                                type: 'text',
                                id: planPayment.id
                            }}
                            id={planPayment.id}
                            onChange={(e) => handleTitle(e.target.value, e.target.id)}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '0.5em', justifyContent: 'space-evenly', flex: 1 }}>
                        {!editing ? <Button variant="contained" onClick={handleEditing} startIcon={<Create />}>Editar</Button> : <Button color="primary" variant="contained" onClick={handleSave} startIcon={<Save />}>Salvar</Button>}
                        <Button style={{ background: '#FFDAB9' }} variant="contained" onClick={handleCancel} startIcon={<Cancel />}>Cancelar</Button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))
    }

    return (
        <Paper elevation={3} className={`${classes.containerSetting} ${classes.marginDefault}`}>
            <div className={classes.headerSetting}>
                <div style={{ display: 'flex' }}>
                    <LibraryBooks />
                    <Typography variant="overline"> Planos de pagamento</Typography>
                </div>
                <IconButton onClick={handleAddPlanPayment} style={{ color: 'rgba(0,0,0,1)' }}>
                    <AddCircle />
                </IconButton>
            </div>
            {
                ListPlanPayments()
            }
        </Paper>
    );
}
