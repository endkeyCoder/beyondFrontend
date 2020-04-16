import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import apiBeyond from '../../config/apiBeyond';
import { syncroSchedulings } from '../../config/redux/actions';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function SelectSchedulings() {
    const classes = useStyles();
    const schedulings = useSelector(state => state.schedulingReducer.schedulings);

    const dispatch = useDispatch();
    useEffect(() => {
        async function getSchedulings() {
            try {
                const resGetScheduling = await apiBeyond.get('/getSchedulings');
                console.log('print de resGetScheduling em SelectSchedulings => ', resGetScheduling.data.data)
                console.log('print de schedulings em SelectSchedulings => ', schedulings)
                if (resGetScheduling.data.data.length !== schedulings.length) {
                    dispatch(syncroSchedulings(resGetScheduling.data.data))
                } else {
                    return false;
                }
            } catch (error) {
                console.log('print de erro em SelectSchedulings => ', error)
                alert('Falha ao carregar os agendamentos')
            }
        }
        getSchedulings();
    }, [schedulings])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Agendamentos realizados</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Porcentagem de Venda %</TableCell>
                            <TableCell >Data da visita</TableCell>
                            <TableCell >Hora da visita</TableCell>
                            <TableCell >Cidade</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Eestado Civil</TableCell>
                            <TableCell>Nome do Conjuge</TableCell>
                            <TableCell>Telefone Fixo</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Profissão</TableCell>
                            <TableCell>Ponto de Referência</TableCell>
                            <TableCell>Link do maps</TableCell>
                            <TableCell>Observação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedulings.map(scheduling => {
                            return (
                                <TableRow key={scheduling.id}>
                                    <TableCell>{scheduling.saleProbability}</TableCell>
                                    <TableCell>{scheduling.dateScheduling}</TableCell>
                                    <TableCell>{scheduling.hourScheduling}</TableCell>
                                    <TableCell>{scheduling.city}</TableCell>
                                    <TableCell>{scheduling.client}</TableCell>
                                    <TableCell>{scheduling.age}</TableCell>
                                    <TableCell>{scheduling.civilState}</TableCell>
                                    <TableCell>{scheduling.spouse}</TableCell>
                                    <TableCell>{scheduling.telephone}</TableCell>
                                    <TableCell>{scheduling.cellphone}</TableCell>
                                    <TableCell>{scheduling.address}</TableCell>
                                    <TableCell>{scheduling.profession}</TableCell>
                                    <TableCell>{scheduling.referencePoint}</TableCell>
                                    <TableCell>{scheduling.linkMaps}</TableCell>
                                    <TableCell>{scheduling.observation}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}