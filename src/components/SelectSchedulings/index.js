import React, { forwardRef, useEffect } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import apiBeyond from '../../config/apiBeyond';
import { useSelector, useDispatch } from 'react-redux';
import { syncroSchedulings } from '../../config/redux/actions';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function SelectSchedulings() {
    const schedulings = useSelector(state => state.schedulingReducer.schedulings);
    const user = useSelector(state => state.userReducer.user.data);
    console.log('print de user em SelectSchedulings => ', user)
    const dispatch = useDispatch();
    const columns = [
        { title: 'Probabilidade de venda %', field: 'saleProbability', type: 'numeric' },
        { title: 'Data da venda', field: 'dateScheduling', type: 'date' },
        { title: 'Hora da venda', field: 'hourScheduling', type: 'time' },
        { title: 'Cidade', field: 'city' },
        { title: 'Cliente', field: 'client' },
        { title: 'Idade do cliente', field: 'age', type: 'numeric' },
        { title: 'Estado Civil', field: 'civilState' },
        { title: 'Conjuge', field: 'spouse' },
        { title: 'Idade do Conjuge', field: 'ageSpouse' },
        { title: 'Telefone', field: 'telephone' },
        { title: 'Celular', field: 'cellphone' },
        { title: 'Endereço', field: 'address' },
        { title: 'Profissão', field: 'profession' },
        { title: 'Ponto de referência', field: 'referencePoint' },
        { title: 'Link do maps', field: 'linkMaps', type: 'url' },
        { title: 'Observação', field: 'observation' },
        { title: 'Destinatário', field: 'externalUserName' }
    ]

    useEffect(() => {
        async function getSchedulings() {
            try {
                const resGetScheduling = await apiBeyond.get(`/getSchedulingsByUser/${user.id}`);
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
    })

    return (
        <MaterialTable
            icons={tableIcons}
            title="Agendamentos realizados"
            columns={columns}
            data={schedulings}
            emptyValue="Nenhum agendamento encontrado"
            options={{
                exportCsv: (columns, schedulings)
            }}
        />
    );
}