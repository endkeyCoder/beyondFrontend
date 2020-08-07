import React, { useState, useEffect } from 'react';
import {
    FormControl, Select, TextField, Button, FormHelperText, makeStyles,
    Chip, Input, MenuItem, List, ListItem, ListSubheader, ListItemText,
    Collapse, Checkbox, FormControlLabel, IconButton, ListItemIcon, Dialog, DialogTitle,
    DialogContent, DialogContentText, withStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Save, ExpandLess, ExpandMore, MonetizationOnRounded, DeleteRounded, Close } from '@material-ui/icons';
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
    },
    dialogHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        products: []
    })
    const [openList, setOpenList] = useState(true)

    const userInfo = useSelector(state => state.userReducer.user.data)
    const [statusList, setStatusList] = useState(['pendente', 'ausente', 'cancelado', 'não localizado', 'não vendido', 'reagendar', 'recusado', 'vendido', 'conjuge ausente'])
    const [listProducts, setListProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [productsSelected, setProductsSelected] = useState([])

    function addProductSale() {
        setDataSale(prevState => {
            let data = [...prevState.products];
            let result = { ...prevState };
            data = [];
            productsSelected.forEach(prod => {
                const newProduct = listProducts.find(product => prod.idProduct == product.id)
                data.push({ idProduct: newProduct.id, value: 0, product: [newProduct] })
            })
            result = {
                ...result,
                products: data
            }
            return result
        })
    }

    function handleProductsSelected(idProd) {
        const newProd = listProducts.find(product => product.id == idProd)
        const prodExist = productsSelected.find(prod => prod.idProduct == newProd.id)
        if (prodExist == undefined) {
            setProductsSelected(prevState => {
                const data = [...prevState];
                data.push({ idProduct: newProd.id, value: 0, product: [newProd], })
                return data
            })
        } else {
            setProductsSelected(prevState => {
                const data = [...prevState];
                data.splice(data.indexOf(prodExist), 1)
                return data
            })
        }
    }

    function handleOpenDialog() {
        setOpenDialog(true)
    }
    function handleCloseDialog() {
        setOpenDialog(false)
    }
    async function loadListProducts() {
        try {
            const resGetProducts = await apiBeyond.get('/getAllProducts')
            setListProducts(resGetProducts.data.data)
        } catch (error) {
            console.log('print de error em laodListProducts => ', error);
            alert('Problema para carregar produtos')
        }
    }
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
                if (resDataSale.data.data.products.length > 0) {
                    setProductsSelected(resDataSale.data.data.products)
                }
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
            const foundedForm = dataFormPayment.find(form => form.idFormPayment == newFormPayment.id);
            if (foundedForm) {
                if (dataFormPayment.length > 1) {
                    dataFormPayment.splice(dataFormPayment.indexOf(foundedForm), 1)
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
            } else if (dataFormPayment.length > 0) {
                if (dataFormPayment[0].idFormPayment == "") {
                    dataFormPayment = [];
                }
                dataFormPayment.push({ idFormPayment: newFormPayment.id, value: 0, formPayment: [newFormPayment] })
            } else {
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
            if (dataSale.formPayments.length < 1 || dataSale.formPayments[0].idFormPayment == "") {
                alert('Ao menos uma forma de pagamento deve ser selecionada')
            } else {
                const resPostSale = await apiBeyond.post('/setSale', dataSale);
                alert(resPostSale.data.message.observation)
            }
        } catch (error) {
            console.log('print de error em handleSubmitSale => ', error);
            alert('Problema ao tentar atualizar agendamento')
        }
    }

    function handleRemoveItem(idProd) {
        let foundProduct = dataSale.products.find(prod => prod.idProduct == idProd);
        setDataSale(prevState => {
            let data = { ...prevState };
            let result = [...prevState.products];
            result.splice(result.indexOf(foundProduct), 1)

            data = {
                ...data,
                products: result
            }
            return data;
        })
        foundProduct = productsSelected.find(prod => prod.idProduct == idProd);
        setProductsSelected(prevState => {
            const data = [...prevState];
            data.splice(data.indexOf(foundProduct), 1);
            return data
        })
    }

    function handleProductSale({ id, value }) {
        const foundProduct = dataSale.products.find(prod => {
            return prod.idProduct == id
        })
        setDataSale(prevState => {
            const data = [...prevState.products];
            if (value !== "") {
                data[data.indexOf(foundProduct)].value = value;
            } else {
                data[data.indexOf(foundProduct)].value = 0;
            }
            return {
                ...prevState,
                products: data
            }
        })
    }

    function handleFormPaymentValue({ id, value }) {
        const foundFormPayment = dataSale.formPayments.find(form => {
            return form.formPayment[0].id == id
        })
        setDataSale(prevState => {
            const data = [...prevState.formPayments];
            if (value !== "") {
                data[data.indexOf(foundFormPayment)].value = value
            } else {
                data[data.indexOf(foundFormPayment)].value = 0
            }
            return {
                ...prevState,
                sale: {
                    ...dataSale.sale,
                    value: data.reduce((sum, formPayment) => {
                        return sum + parseFloat(formPayment.value)
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
        if (listProducts <= 0) {
            loadListProducts()
        }
    })

    useEffect(() => {
        setDataSale(prevState => {
            const data = { ...prevState }
            const sumFormPayments = data.formPayments.reduce((sum, formPayment) => {
                return sum + parseFloat(formPayment.value)
            }, 0)
            return {
                ...data,
                sale: {
                    ...data.sale,
                    value: sumFormPayments
                }
            }
        })
    }, [dataSale.formPayments])
    console.log('print de dataSale => ', dataSale)
    console.log('print de productSelected => ', productsSelected)
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
                        {
                            statusList.map((status, key) => <option key={key} value={status}>{status}</option>)
                        }
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
                        input={<Input required id="select-multiple-chip" />}
                        renderValue={(selected) => {
                            if (selected[0].idFormPayment == "") {
                                return ""
                            }
                            else {
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

                <Button onClick={handleOpenDialog} variant="contained" color="primary" style={{ width: '100%' }}>Adicionar Produtos<sup>+</sup></Button>
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
                <List
                    className={classes.listRoot}
                    subheader={<ListSubheader>Itens da venda</ListSubheader>}
                >
                    <ListItem button onClick={handleShowList}>
                        <ListItemText>Total da itens da venda: {dataSale.products.length}</ListItemText>
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openList}>
                        <List className={classes.listNested}>
                            {
                                dataSale.products.map(prod => {

                                    if (dataSale.products.length > 0) {
                                        return (
                                            <ListItem key={`list-item-${prod.idProduct}`} style={{ alignItems: 'baseline' }}>
                                                <TextField
                                                    label={prod.product[0].title}
                                                    placeholder="Valor do produto"
                                                    value={prod.value}
                                                    InputProps={{
                                                        endAdornment: <MonetizationOnRounded />
                                                    }}
                                                    id={prod.idProduct}
                                                    onChange={e => handleProductSale(e.target)}
                                                    helperText={prod.product[0].description}
                                                />
                                                <IconButton id={prod.idProduct} onClick={e => handleRemoveItem(e.target.id)}>
                                                    <DeleteRounded />
                                                </IconButton>
                                            </ListItem>
                                        )
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle id="alert-dialog-title" style={{ padding: '0 0 0 16px' }}>
                    <div className={classes.dialogHeader}>
                        Lista de Itens
                    <IconButton onClick={handleCloseDialog}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.container}>
                        <List
                            className={classes.listRoot}
                        >
                            {
                                listProducts.map(prod => (
                                    <ListItem key={`list-item-${prod.id}`} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                id={prod.id}
                                                value={prod.id}
                                                onChange={(e) => handleProductsSelected(e.target.value)}
                                                checked={productsSelected.find(product => product.idProduct == prod.id) ? true : false}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={prod.title} />
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Button style={{ margin: '0.5em 0 0', width: '100%' }} size="small" onClick={addProductSale} variant="contained" color="primary">Incluir na venda</Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </form>
    );
}

export default EndSale;