import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import { Autocomplete } from '@material-ui/lab';
import apiBeyond from '../../config/apiBeyond';
import moment from 'moment';
import { TextField, FormControl, Select, InputLabel, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({ //meus estilos ficam aqui 
    table: {
        minWidth: 500,
    },
    container: {
        display: 'flex'
    },
    container2: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.6em',
    },
    item: {
        width: '100%',
        maxWidth: '10em',
        [theme.breakpoints.up('sm')]: {
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '0.5em'
        }
    },
    header: {
        display: 'flex',
        padding: '0.6em',
        flexWrap: 'wrap',
        width: '100%'
    },
}));


export default function SalesTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [initialDate, setInitialDate] = React.useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
    const [finalDate, setFinalDate] = React.useState(moment().format('YYYY-MM-DD'))
    const [dataBody, setDataBody] = React.useState({
        sales: [
            {
                id: 0,
                value: 0,
                createdAt: '',
                scheduling: [
                    {
                        createdAt: ''
                    }
                ],
                user: [
                    {
                        name: '',
                        nick: ''
                    }
                ],
                planPayment: [
                    {
                        title: ''
                    }
                ],
                formPaymentsId: [
                    {
                        id: 0,
                        value: 0,
                        entry: false,
                        formPayment: [
                            {
                                id: 0,
                                title: ''
                            }
                        ]
                    }
                ]
            }
        ],
        totSales: 0
    })
    const [listFormPayments, setListFormPayments] = React.useState([
        {
            id: 0,
            title: ''
        }
    ])
    const [load, setLoad] = React.useState(true);
    const externalUsers = useSelector(state => state.externalUsersReducer.externalUsers)
    const [usergroups, setUsergroups] = useState([
        {
            id: '',
            name: 'Todos',
            default: true
        },
    ]);
    const [groupSelected, setGroupSelected] = useState('');
    const [externalUserSelected, setExternalUserSelected] = useState({
        id: '',
        name: 'Todos'
    })
    const [dateScheduling, setDateScheduling] = useState('false')
    const dataHead = ['Lançamento da venda', 'Plano de pagamento', 'total da venda', 'data da visita', 'usuário externo',
        'Entrada', 'Observação']
    const [totRows, setTotRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const queryDataBody = async () => {
        try {
            const resGetSalesByFilters = await apiBeyond.get(`/getSalesByFilters?initialDate=${initialDate}&finalDate=${finalDate}&idExternalUser=${externalUserSelected.id}&idGroup=${groupSelected}&dateScheduling=${dateScheduling}`)
            setDataBody(resGetSalesByFilters.data.data)
            setTotRows(resGetSalesByFilters.data.data.sales.length)
            console.log('print de totRows => ', totRows)
            setLoad(false)
        } catch (error) {
            console.log('print de error em loadDataBody => ', error)
            alert('Problema ao consultar dados do relatorio')
        }
    }
    const loadFormPayments = async () => {
        try {
            const resGetAllFormPayments = await apiBeyond('/getAllFormPayments');
            setListFormPayments(resGetAllFormPayments.data.data)
        } catch (error) {
            console.log('print de error em loadFormPayments => ', error)
            alert('Problema ao carregar formas de pagamento')
        }
    }

    const loadGroups = async () => {
        try {
            const resGroups = await apiBeyond.get('/getAllUserGroups');
            if (resGroups.data.message.statusCode == 200) {
                resGroups.data.data.push(usergroups[0])
                setUsergroups(resGroups.data.data)
            }
        } catch (error) {
            console.log('print de error em loadGroups => ', error);
            alert('Problema para carregar os grupos de usuário')
        }
    }

    const handleInitialDate = (value) => {
        if (value) {
            if (moment(value).year() > 2000) {
                setInitialDate(value)
            }
        }
    }

    const handleFinalDate = (value) => {
        if (value) {
            if (moment(value).year() > 2000) {
                setFinalDate(value)
            }
        }
    }

    const handleGroupSelected = (value) => {
        setGroupSelected(value)
    }

    const handleExternalUserSelected = (value) => {
        if (value == null) {
            setExternalUserSelected({ id: '', name: '' })
        } else if (value.name.length >= 3) {
            setExternalUserSelected(value)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value)
    }

    React.useEffect(() => {
        if (load) {
            queryDataBody()
            loadFormPayments()
            loadGroups()
        }
    }, [load])

    React.useEffect(() => {
        queryDataBody()
    }, [initialDate, finalDate, externalUserSelected, groupSelected])

    return (
        <Paper className={classes.container2} elevation={3}>
            <div className={classes.container2}>
                <h3>Relatório de vendas</h3>
                <div className={classes.header}>
                    <TextField
                        className={classes.item}
                        label="De"
                        type="date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={initialDate}
                        onChange={e => handleInitialDate(e.target.value)}
                    />
                    <TextField
                        className={classes.item}
                        label="Até"
                        type="date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={finalDate}
                        onChange={e => handleFinalDate(e.target.value)}
                    />
                    <Autocomplete
                        options={externalUsers}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Usuário Externo" />}
                        size="small"
                        className={classes.item}
                        value={externalUserSelected}
                        onChange={(_, value) => handleExternalUserSelected(value)}
                        required
                    />
                    <FormControl className={classes.item}>
                        <InputLabel shrink={true}>
                            Grupo
                        </InputLabel>
                        <Select value={groupSelected} onChange={e => handleGroupSelected(e.target.value)} native> {/**Precisa da função handle e um state de valor */}
                            {
                                usergroups.map(group => (<option key={group.id} value={group.id}>{group.name}</option>))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead style={{ background: '#00000080' }}>
                        <TableRow style={{ color: '#fff' }}>
                            {
                                dataHead.map((item, index) => <TableCell key={index} component="th" scope="row">{item}</TableCell>)
                            }
                            {
                                listFormPayments.map(formPayment => {
                                    const { id, title } = formPayment
                                    return (
                                        <TableCell key={id}>{title}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                ? dataBody.sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : dataBody.sales).map((sale, index) => {
                                    if ((index + 1) <= rowsPerPage) {
                                        const { id, value, createdAt: date, observation } = sale;
                                        const { dateScheduling } = sale.scheduling[0];
                                        const { name, nick } = sale.user[0];
                                        const { title: titlePlanPayment } = sale.planPayment[0];
                                        const valuesEntries = sale.formPaymentsId.map(dataFormPaymentId => {
                                            const { value: valueFormPayentEntry, entry, id: idFormpaymentEntry } = dataFormPaymentId
                                            const { title: titleFormPaymentEntry } = dataFormPaymentId.formPayment[0]
                                            if (entry) {
                                                return { titleFormPaymentEntry, valueFormPayentEntry, idFormpaymentEntry }
                                            }
                                            return false
                                        })
                                        const valuesSales = sale.formPaymentsId.map(dataFormPaymentId => {
                                            const { value: valueFormPayent } = dataFormPaymentId
                                            const { title: titleFormPayment, id: idFormpayment, rate } = dataFormPaymentId.formPayment[0]
                                            return { titleFormPayment, valueFormPayent, idFormpayment, rate }
                                        })
                                        return (
                                            <TableRow key={id}>
                                                <TableCell>
                                                    {moment(date).format('DD-MM-YYYY')}
                                                </TableCell>
                                                <TableCell>
                                                    {titlePlanPayment}
                                                </TableCell>
                                                <TableCell>
                                                    {value}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(dateScheduling).format('DD-MM-YYYY')}
                                                </TableCell>
                                                <TableCell>
                                                    <b>Nome: </b>{name}<br />
                                                    <b>Nick: </b>{nick}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        valuesEntries.map(values => {
                                                            if (values) {
                                                                return (
                                                                    <div>
                                                                        <b>Forma de pagamento: </b>{values.titleFormPaymentEntry}<br />
                                                                        <b>Valor: </b>{values.valueFormPayentEntry}<br />
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </TableCell>
                                                <TableCell>{observation}</TableCell>
                                                {
                                                    listFormPayments.map(formPayment => {
                                                        const { id } = formPayment
                                                        const fieldSelected = valuesSales.find(valueSale => {
                                                            return valueSale.idFormpayment == id
                                                        })
                                                        if (fieldSelected) {
                                                            return (
                                                                <TableCell key={id}>
                                                                    {
                                                                        <div>
                                                                            <b>Valor: </b>{fieldSelected.valueFormPayent}<br />
                                                                            <b>Taxa: </b>{fieldSelected.rate}
                                                                        </div>
                                                                    }
                                                                </TableCell>
                                                            )
                                                        }
                                                        return <TableCell />;
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    } else {
                                        return (
                                            <TableRow />
                                        )
                                    }
                                })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <div style={{ width: '15em', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <h4>Total bruto: </h4>
                                    {dataBody.totSales}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <h4>Total de taxas: </h4>
                                    {dataBody.totRates}
                                </div>
                                <Divider />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <h4>Total líquido: </h4>
                                    {dataBody.totLiquid}
                                </div>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 75, 100, { label: 'All', value: totRows }]}
                                SelectProps={{
                                    native: true
                                }}
                                labelRowsPerPage="Linhas por página"
                                count={totRows}
                                onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e.target.value)}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={(evt, newPage) => handleChangePage(evt, newPage)}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer >
        </Paper>
    );
}
