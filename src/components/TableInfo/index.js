import React, { useState } from 'react';
import MaterialTable from 'material-table';
import apiBeyond from '../../config/apiBeyond';

// import { Container } from './styles';

export default function TableInfo({
    columns,
    rows,
    options = {
        title: 'Nenhum titulo informado',
        routes: {
            rCreate: false,
            rRead: false,
            rUpdate: false,
            rDelete: false
        }
    }
}) {
    const [stateTable, setStateTable] = useState({
        stateColumns: columns,
        stateRows: rows,
    })
    const { title, routes } = options;
    const { rCreate, rRead, rUpdate, rDelete } = routes;
    return (
        <MaterialTable
            title={title}
            columns={stateColumns}
            data={stateRows}
            editable={{
                onRowAdd: async (newData) => {
                    if (rCreate) {
                        try {
                            const response = await apiBeyond.post(rCreate, newData);
                            setStateTable((prevState => {
                                const data = [...prevState.stateRows];
                                data.push(response.data.data)
                            }))
                        } catch (error) {
                            console.log('print de error em TableInfo => ', error)
                            alert('problema ao tentar incluir uma informação usando TableInfo')
                        }
                    } else {
                        alert('Configuração incorreta')
                    }
                },
                onRowUpdate: async (newData, oldData) => {
                    if(rUpdate){
                        try {
                            const response = await apiBeyond.put(rUpdate, newData);
                            if (oldData) {
                                setState((prevState) => {
                                  const data = [...prevState.stateRows];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                              }
                        } catch (error) {
                            console.log('print de error em TableInfo => ', error)
                            alert('problema ao tentar atualizar uma informação usando TableInfo')
                        }
                    }
                }
            }}
        >

        </MaterialTable>
    );
}
