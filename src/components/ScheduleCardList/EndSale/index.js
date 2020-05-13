import React, { useState, useEffect } from 'react';
import {
    FormControl, Select, TextField, Button, FormHelperText, makeStyles,
    Chip, Input, MenuItem, List, ListItem, ListSubheader, ListItemText,
    Collapse, Checkbox, FormControlLabel
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Save, ExpandLess, ExpandMore } from '@material-ui/icons';
import apiBeyond from '../../../config/apiBeyond';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    inputsEndSale: {
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    formEndSale: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    listRoot: {
        backgroundColor: '#f0f0f0',
        width: '100%'
    },
    listNested: {
        paddingLeft: theme.spacing(4)
    }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function EndSale({ scheduling }) {
    const classes = useStyles();
    const [planPayments, setPlanpayments] = useState([]);
    const [formPayments, setFormPayments] = useState([]);
    const [dataSale, setDataSale] = useState({
        sale: {
            planPaymentId: '',
            planPayment: [
                {
                    title: 'Nenhum',
                    entry: false,
                    id: ''
                }
            ],
            value: 0,
            observation: '',
            schedulingId: scheduling.id,
            userId: scheduling.externalUser,
            scheduling: [
                {
                    status: scheduling.status
                }
            ]
        },
        formPayments: [
            {
                idFormPayment: "",
                value: 0,
                entry: false,
                formPayment: [
                    {
                        id: '',
                        title: ''
                    }
                ]
            },
        ],

    })
    const [openList, setOpenList] = useState(true)

    const userInfo = useSelector(state => state.userReducer.user.data)

    async function loadPlanPayments() {
        try {
            const resPlanPayments = await apiBeyond.get('/getAllPlanPayments');
            if (resPlanPayments.data.data.length > 0) {
                setPlanpayments(resPlanPayments.data.data)
            }
        } catch (error) {
            console.log('print de error em endSale => ', error)
            alert('Problema ao carregare os planos de pagamento cadastrados')
        }
    }
    async function loadFormPayments() {
        try {
            const resFormPayments = await apiBeyond.get('/getAllFormPayments');
            if (resFormPayments.data.data.length > 0) {
                setFormPayments(resFormPayments.data.data)
            }
        } catch (error) {
            console.log('print de error em endSale => ', error)
            alert('Problema ao carregare as formas de pagamento cadastrados')
        }
    }

    async function loadDataSale() {
        try {
            const resDataSale = await apiBeyond.get(`/getSaleByIdScheduling/${scheduling.id}`);
            if (resDataSale.data.message.statusCode == 200) {
                setDataSale(resDataSale.data.data)
            }
        } catch (error) {
            console.log('print de error em loadDataSale => ', error);
            alert('Problema ao carregar os dados da venda')
        }
    }

    function getEntryByPlanPayment(idPlanPayment) {
        const findPlanPayment = planPayments.find(planPayment => {
            return planPayment.id == idPlanPayment
        })

        if (findPlanPayment !== undefined) {
            return findPlanPayment.entry
        } else {
            return false
        }
    }
    function handleShowList() {
        setOpenList(!openList)
    }

    function handleStatus(value) {
        setDataSale({
            ...dataSale,
            sale: {
                ...dataSale.sale,
                scheduling: [
                    {
                        ...dataSale.sale.scheduling[0],
                        status: value
                    }
                ]
            }
        })
    }
    function handlePlanPaymentSelected(value) {
        if (value == "") {
            return
        }
        setDataSale(prevState => {
            const dataPlanPayment = [...prevState.sale.planPayment]
            const oldData = dataPlanPayment.find(plan => plan.id == prevState.sale.planPaymentId);
            dataPlanPayment[dataPlanPayment.indexOf(oldData)] = planPayments.find(plan => plan.id == value)
            return {
                ...prevState,
                sale: {
                    ...prevState.sale,
                    planPaymentId: value,
                    planPayment: dataPlanPayment
                }
            }
        })
    }
    function handleFormPaymentSelected(value) {

        setDataSale(prevState => {
            let dataFormPayment = [...prevState.formPayments]

            const newFormPayment = formPayments.find(form => form.id == value);
            if (dataFormPayment.find(form => form.idFormPayment == newFormPayment.id)) {
                if (dataFormPayment.length > 1) {
                    dataFormPayment.splice(dataFormPayment.indexOf({ idFormPayment: newFormPayment.id, formPayment: [newFormPayment] }), 1)

                } else {
                    dataFormPayment = [
                        {
                            idFormPayment: "",
                            value: 0,
                            formPayment: [
                                {
                                    title: ''
                                }
                            ]
                        },
                    ]
                }
            } else {
                if (dataFormPayment[0].idFormPayment == "") {
                    dataFormPayment = [];
                }
                dataFormPayment.push({ idFormPayment: newFormPayment.id, value: 0, formPayment: [newFormPayment] })
            }
            return {
                ...prevState,
                formPayments: dataFormPayment
            }
        })
    }
    function handleValueSale(value) {
        setDataSale({
            ...dataSale,
            sale: {
                ...dataSale.sale,
                value: value
            }
        })
    }
    function handleEntry(idFormPayment, checked) {
        setDataSale(prevState => {
            const data = [...prevState.formPayments]
            const paymentWillChanged = data.find(formPaymentSale => formPaymentSale.idFormPayment == idFormPayment);
            data[data.indexOf(paymentWillChanged)].entry = checked;
            return {
                ...prevState,
                formPayments: data
            }
        })
    }
    function handleObservation(value) {
        setDataSale({
            ...dataSale,
            sale: {
                ...dataSale.sale,
                observation: value
            }
        })
    }
    async function handleSubmitSale(e) {
        e.preventDefault();
        try {
            const resPostSale = await apiBeyond.post('/setSale', dataSale);
            alert(resPostSale.data.message.observation)
        } catch (error) {
            console.log('print de error em handleSubmitSale => ', error);
            alert('Problema ao tentar atualizar agendamento')
        }
    }

    function handleFormPaymentValue({ id, value }) {
        //ao remover uma forma de pagamento o valor não está sendo atualizado
        const foundFormPayment = dataSale.formPayments.find(form => {
            return form.formPayment[0].id == id
        })
        setDataSale(prevState => {
            const data = [...prevState.formPayments];
            data[data.indexOf(foundFormPayment)].value = value
            return {
                ...prevState,
                sale: {
                    ...dataSale.sale,
                    value: data.reduce((sum, formPayment) => {
                        if (value !== "") {
                            return sum + parseFloat(formPayment.value)
                        }
                    }, 0)
                },
                formPayments: data
            }
        })
    }

    useEffect(() => {
        if (planPayments.length <= 0) {
            loadPlanPayments()
        }
        if (formPayments.length <= 0) {
            loadFormPayments()
        }
        if (dataSale.sale.planPaymentId == '') {
            loadDataSale()
        }
    })

    return (
        <form className={classes.formEndSale} onSubmit={handleSubmitSale}>
            <h5>Finalizando agendamento</h5>
            <div className={classes.inputsEndSale}>
                <FormControl className={classes.formControl}>
                    <Select
                        native
                        value={dataSale.sale.scheduling[0].status}
                        onChange={e => handleStatus(e.target.value)}
                    >
                        <option value="Agendado">Agendado</option>
                        <option value="pendente">Pendente</option>
                        <option value="vendido">Vendido</option>
                        <option value="não vendido">Não vendido</option>
                    </Select>
                    <FormHelperText>Status do agendamento</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        value={dataSale.formPayments}
                        onChange={e => {
                            handleFormPaymentSelected(e.target.value[e.target.value.length - 1])
                        }}
                        required
                        multiple
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => {
                            if (selected[0].idFormPayment == "") {
                                return ""
                            }
                            else{
                                return (
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map(value => (
                                        <Chip key={value.idFormPayment} label={value.formPayment[0].title} style={{ margin: 2 }} />
                                    ))}
                                </div>
                            )
                            }
                        }}
                        MenuProps={MenuProps}
                    >
                        {
                            formPayments.map((formPayment, index) => {
                                return (
                                    <MenuItem key={index} value={formPayment.id}>{formPayment.title}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>Formas de pagamento utilizada</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                        native
                        value={dataSale.sale.planPaymentId}
                        onChange={e => handlePlanPaymentSelected(e.target.value)}
                        required
                    >
                        <option value=''>Nenhum</option>
                        {
                            planPayments.map((planPayment, index) => {
                                return (
                                    <option key={index} value={planPayment.id}>{planPayment.title}</option>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>Plano de pagamento utilizado</FormHelperText>
                </FormControl>

                <List
                    className={classes.listRoot}
                    subheader={<ListSubheader>Valores da venda</ListSubheader>}
                >
                    <ListItem button onClick={handleShowList}>
                        <ListItemText>Total da venda: {dataSale.sale.value}</ListItemText>
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openList}>
                        <List className={classes.listNested}>
                            {
                                dataSale.formPayments.map((form, index) => {
                                    if (form.idFormPayment !== "") {
                                        if (dataSale.sale.planPayment[0].entry == true) {
                                            return (
                                                <ListItem key={form.idFormPayment}>
                                                    <TextField
                                                        id={dataSale.formPayments[index].idFormPayment}
                                                        label={form.formPayment[0].title}
                                                        type="number"
                                                        value={dataSale.formPayments[index].value}
                                                        onChange={e => handleFormPaymentValue(e.target)}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                id={dataSale.formPayments[index].idFormPayment}
                                                                color="secondary"
                                                                checked={dataSale.formPayments[index].entry}
                                                                onChange={(e) => handleEntry(e.target.id, e.target.checked)}
                                                            />
                                                        }
                                                        label="Entrada"
                                                    />
                                                </ListItem>
                                            )
                                        } else {
                                            return (
                                                <ListItem key={form.idFormPayment}>
                                                    <TextField
                                                        id={dataSale.formPayments[index].idFormPayment}
                                                        label={form.formPayment[0].title}
                                                        type="number"
                                                        value={dataSale.formPayments[index].value}
                                                        onChange={e => handleFormPaymentValue(e.target)}
                                                    />
                                                </ListItem>
                                            )
                                        }
                                    }
                                })
                            }

                        </List>
                    </Collapse>

                </List>

                <TextField
                    multiline
                    rowsMax={15}
                    label="Observação"
                    className={classes.formControl}
                    required
                    value={dataSale.sale.observation}
                    onChange={e => handleObservation(e.target.value)}
                />
            </div>
            <div>
                <Button type="submit" variant="contained" startIcon={<Save />}>
                    Salvar
                </Button>
            </div>
        </form>
    );
}

export default EndSale;