import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    border-radius: 25px;
    padding: 1em;
    background-color: #999;
    margin-bottom: 1em;
    box-shadow: 3px 5px rgba(0,0,0,0.6)
`;

export const ButtonCrud = styled.button`
    padding: 1em;
    border-radius: 5px;
    background: ${props => props.bgButton ? props.bgButton : '#666'};
    color: ${props => props.colorButton ? props.colorButton : '#fff'};
    border: 1px solid;
    outline: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
`;


