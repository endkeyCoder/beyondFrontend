import React, { useState } from 'react';
import MenuBar from '../../components/MenuBar';
//import SelectSchedulings from '../../components/SelectSchedulings';
import SchedulingSelect from '../../components/SchedulingSelect';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import SchedulingPost from '../../components/SchedulingPost';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '1em',
    }
}))

export default function Schedulings() {
    const crud = useSelector(state => state.userReducer.user.permissions.find(permission => permission.entity[0].name == 'schedulings'))
    console.log('print das permissoes de agendamentos => ', crud)
    //achei melhor filtrar pelo nome do que pelo id da entidade por ser mais facil de ler o código

    function BuilderScreen() {
        const arrComponents = [];
        if (crud.add) {
            arrComponents.push(SchedulingPost)
        }
        if (crud.read) {
            arrComponents.push(SchedulingSelect)
        }
        return arrComponents;
    }
    const classes = useStyles();
    return (
        <>
            <MenuBar />
            <div className={classes.container}>
                {
                    BuilderScreen().map((Component, index) => <Component key={index} />)
                }
            </div>
        </>
    );
}
