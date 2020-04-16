import React from 'react';
import MenuBar from '../../components/MenuBar';
import ShedulingPost from '../../components/SchedulingPost';
import CrudOptions from '../../components/CrudOptions';
import SelectSchedulings from '../../components/SelectSchedulings';
import { Container } from './styles';

export default function Schedulings() {
    return (
        <>
            <MenuBar />
            <Container>
                <ShedulingPost />
                <SelectSchedulings />
            </Container>
        </>
    );
}
