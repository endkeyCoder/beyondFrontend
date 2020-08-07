import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, TextField, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton,
    Dialog, DialogContent, DialogContentText, DialogTitle, makeStyles, Divider
} from '@material-ui/core';
import apiBeyond from '../../config/apiBeyond';
import { MenuBook, ExpandMore } from '@material-ui/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexWrap: 'wrap',
        marginBottom: '0.4em'
    },
    item: {
        width: '100%',
        maxWidth: '30em',
        [theme.breakpoints.up('sm')]: {
            marginRight: '0.8em'
        }
    },
    container1: {
        padding: '0.8em',
        marginTop: '0.5em',
        [theme.breakpoints.down('sm')]: {
            flex: 'auto'
        }
    },
    comission: {
        justifyContent: 'space-between'
    }
}))

export default function CommissionUserList() {
    const [initialDate, setInitialDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));
    const [dataCommissions, setDataCommissions] = useState({
        sales: [],
        totCommission: 0
    });
    const infoUser = useSelector(state => state.userReducer.user.data);
    const userExternal = infoUser.userGroup[0].external;
    console.log('print de infoUser => ', infoUser, userExternal)
    const handleInitialDate = (value) => {
        if (value !== '') {
            setInitialDate(value);
        }
    }
    const handleFinalDate = (value) => {
        if (value !== '') {
            setFinalDate(value)
        }
    }

    const loadCommissions = async () => {
        if (userExternal) {
            try {
                const resGetCommissions = await apiBeyond.get(`/getComissionByUserId?id=${infoUser.id}&initialDate=${initialDate}&finalDate=${finalDate}`)
                console.log('print de resGetCommissions => ', resGetCommissions.data.data)
                if ( 'sales' in resGetCommissions.data.data) {
                    if (resGetCommissions.data.data.sales.length > 0) {
                        setDataCommissions(resGetCommissions.data.data)
                    }
                }
            } catch (error) {
                console.log('print de error em loadCommission => ', error);
                alert('Problema ao tentar carregar as comissões')
            }
        }
    }

    useEffect(() => {
        loadCommissions()
    }, [initialDate, finalDate])

    const classes = useStyles();
    if (userExternal) {
        return (
            <Paper elevation={3} className={classes.container1}>
                <div className={`${classes.container}`}>
                    <Typography variant="h6">Minhas Comissões</Typography>
                </div>
                <Divider />
                <div className={classes.container}>
                    <TextField
                        label="De"
                        value={initialDate}
                        onChange={e => handleInitialDate(e.target.value)}
                        className={classes.item}
                        InputLabelProps={{
                            shrink: true
                        }}
                        type="date"
                    />
                    <TextField
                        label='Até'
                        value={finalDate}
                        onChange={e => handleFinalDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        type="date"
                        className={classes.item}
                    />
                </div>
                <div className={classes.container}>
                    <ExpansionPanel elevation={2}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                            <Typography variant="srOnly">Comissão</Typography>
                            <Typography variant="h4">R$ {dataCommissions.totCommission}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.container}>
                            {
                                dataCommissions.sales.map(sale => <CommissionUser key={sale.id} sale={sale} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Paper>
        )
    }
    return <></>
}

function CommissionUser(props) {
    const { commission, date, details } = props.sale;
    const [openDetails, setOpenDetails] = useState(false);
    const classes = useStyles();

    const handleOpenDetails = () => {
        setOpenDetails(true)
    }
    return (
        <>
            <Paper className={`${classes.container} ${classes.item} ${classes.comission}`} elevation={1}>
                <div>
                    <Typography variant="subtitle2">Data: {moment(date).format('DD-MM-YYYY')}</Typography>
                    <Typography variant="subtitle1">R$ {commission}</Typography>
                </div>
                <IconButton onClick={handleOpenDetails}>
                    <MenuBook />
                </IconButton>
            </Paper>
            <DetailsSale open={{ openDetails, setOpenDetails }} data={details} />
        </>
    )
}

function DetailsSale(props) {
    const { openDetails, setOpenDetails } = props.open
    const handleClose = () => {
        setOpenDetails(false)
    }
    const classes = useStyles();
    return (
        <Dialog open={openDetails} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">Detalhes da venda</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className={classes.container}>
                   <h2>Em desenvolvimento</h2>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}