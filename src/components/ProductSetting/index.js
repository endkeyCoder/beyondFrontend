import React, { useState, useEffect } from 'react';
import {
    Paper, IconButton, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, TextField,
    Typography, makeStyles, Button
} from '@material-ui/core';

import { AddBox, ExpandMore, MonetizationOn, KingBed } from '@material-ui/icons';

import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '0.4em',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flex: 1
        }
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bodyProduct: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flex: 1
        }
    },
    item: {
        margin: '0 0.2em 0.3em 0'
    }
}))

export default function ProductSettings() {
    const productObj = {
        product: {
            title: 'Título',
            description: 'Alguma descrição qualquer sobre o produto cadastrado',
            aboutPrice: 0,
        },
        prices: [
            {
                value: 0,
                commission: 0,
                id: 0
            }
        ]
    }
    const pricesArr = [
        {
            value: 0,
            commission: 0,
            id: 0
        }
    ];
    const [productList, setProductList] = useState([])

    const [load, setLoad] = useState(true)

    const addProduct = () => {
        setProductList(prevState => {
            const data = [...prevState]
            productObj.prices = pricesArr;
            data.push(productObj)
            return data;
        })
    }

    const buildObjProduct = (objProduct) => {
        const { id, title, description, price, aboutPrice } = objProduct;
        return {
            product: { id, title, description, aboutPrice },
            prices: price
        }
    }

    const loadProducts = async () => {
        try {
            const resGetProducts = await apiBeyond.get('/getAllProducts')
            setLoad(false)
            setProductList(resGetProducts.data.data.map(product => buildObjProduct(product)))
        } catch (error) {
            console.log('print de error em loadProducts => ', error)
            alert('Problema ao carregar produtos')
        }
    }

    useEffect(() => {
        if (load) {
            loadProducts()
        }
    }, [load])

    const classes = useStyles();
    return (
        <Paper elevation={3}>
            <div className={`${classes.container} ${classes.header}`}>
                <div style={{ display: 'flex' }}>
                    <KingBed />
                    <Typography variant="subtitle1">Produtos</Typography>
                </div>
                <IconButton onClick={addProduct}>
                    <AddBox />
                </IconButton>
            </div>
            {
                productList.map((productData, index) => <Product key={index} data={productData} />)
            }
        </Paper>
    )
}

function Product(props) {
    const { data } = props;
    const [dataProduct, setDataProduct] = useState(data)

    const handleTitle = (value) => {
        setDataProduct(prevState => {
            const data = { ...prevState }
            data.product.title = value
            return data
        })
    }

    const handleDescription = (value) => {
        setDataProduct(prevState => {
            const data = { ...prevState };
            data.product.description = value
            return data
        })
    }

    const handleAboutPrice = (value) => {
        setDataProduct(prevState => {
            const data = { ...prevState };
            data.product.aboutPrice = value
            return data
        })
    }

    const setPrice = () => {
        setDataProduct(prevState => {
            const data = { ...prevState }
            const { prices } = data
            prices.push({
                value: 0,
                commission: 0,
                id: prices[prices.length - 1].id + 1
            })

            return data
        })
    }

    const handleValuePrice = (value, id) => {
        setDataProduct(prevState => {
            const data = { ...prevState };
            const { prices } = data;
            prices.find(price => price.id == id).value = value
            return data
        })
    }
    const handleCommissionPrice = (value, id) => {
        setDataProduct(prevState => {
            const data = { ...prevState };
            const { prices } = data;
            prices.find(price => price.id == id).commission = value
            return data
        })
    }

    const submitProduct = async () => {
        try {
            const resSetProduct = await apiBeyond.post('/setProduct', dataProduct)
            console.log('print de resSetProduct => ', resSetProduct.data)
            alert(resSetProduct.data.message.observation)
        } catch (error) {
            console.log('print de error em submitProduct => ', error);
            alert('Problema ao cadastrar o produto')
        }
    }

    const classes = useStyles();
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">{dataProduct.product.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.bodyProduct}>
                <div className={classes.container}>
                    <div className={classes.bodyProduct}>
                        <TextField
                            label="titulo"
                            value={dataProduct.product.title}
                            variant="outlined"
                            className={classes.item}
                            onChange={e => handleTitle(e.target.value)}
                        />
                        <TextField
                            label="descrição"
                            value={dataProduct.product.description}
                            variant="outlined"
                            multiline
                            className={classes.item}
                            onChange={e => handleDescription(e.target.value)}
                        />
                    </div>
                    <Paper elevation={3}>
                        <div className={`${classes.container} ${classes.header}`}>
                            <div style={{ display: 'flex' }}>
                                <MonetizationOn />
                                <Typography variant="subtitle1">Valores</Typography>
                            </div>
                            <IconButton onClick={setPrice}>
                                <AddBox />
                            </IconButton>
                        </div>
                        {
                            dataProduct.prices.map((price, index) => (
                                <div className={classes.container}>
                                    <TextField
                                        label="Preço R$"
                                        value={price.value}
                                        variant="filled"
                                        className={classes.item}
                                        onChange={e => handleValuePrice(e.target.value, e.target.id)}
                                        id={price.id}
                                        type="number"
                                    />
                                    <TextField
                                        label="comissão"
                                        value={price.commission}
                                        variant="filled"
                                        className={classes.item}
                                        onChange={e => handleCommissionPrice(e.target.value, e.target.id)}
                                        id={price.id}
                                        type="number"
                                    />
                                </div>
                            ))
                        }
                        <div className={classes.container}>
                            <TextField
                                label="Comissão acima da tabela %"
                                variant="outlined"
                                className={classes.item}
                                value={dataProduct.product.aboutPrice}
                                onChange={e => handleAboutPrice(e.target.value)}
                                type="number"
                            />
                        </div>
                    </Paper>
                </div>
                <div className={classes.container}>
                    <Button onClick={submitProduct} variant="contained" color="primary" className={classes.item}>Salvar</Button>
                    <Button variant="contained" color="secondary" className={classes.item}>Excluir</Button>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}