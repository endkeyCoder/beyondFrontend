import React from 'react';
import Menu from '../../components/MenuBar';
import CardInfoUser from '../../components/CardInfoUser';
// import { Container } from './styles';

export default function Home() {

    return (
        <>
            <Menu />
            <section>
                <CardInfoUser />
            </section>
        </>
    );
}
