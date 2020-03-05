import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../../components/MenuBar';
// import { Container } from './styles';

export default function Home() {
    const userSession = useSelector(state => {
        return state.userSession.infoUser;
    })
    useEffect(() => {
        console.log(userSession)
    })

    return (
        <Menu />
    );
}
