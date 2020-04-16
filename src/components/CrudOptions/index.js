import React from 'react';

import { Container, ButtonCrud } from './styles';

export default function CrudOptions() {
    return (
        <Container>
            <ButtonCrud>Consultar</ButtonCrud>
            <ButtonCrud bgButton="#006400">Cadastrar</ButtonCrud>
            <ButtonCrud bgButton="#00008B">Atualizar</ButtonCrud>
            <ButtonCrud bgButton="#8B0000">Excluir</ButtonCrud>
        </Container>
    );
}
