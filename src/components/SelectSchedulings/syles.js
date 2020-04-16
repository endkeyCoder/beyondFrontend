import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    border-radius: 15px;
    border: solid;
    box-shadow: 5px 7px rgba(0.0.0.0.5);
    flex-direction: ${props => props.orientation || 'row'};
`;

export const TableScheduling = styled.table`
    
`;
