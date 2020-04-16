import styled from 'styled-components';

export const Container = styled.div`
    display: ${props => props.display ? props.display : 'flex'};
    flex-direction: ${props => props.orientation || 'row'};
    justify-content: ${props => props.justfyContent || 'flex-start'};
    align-items: ${props => props.alignItens || 'flex-start'};
    margin:${props => props.margin || '0'};
    padding: ${props => props.padding || '0'};
    margin: ${props => props.margin || '0 0 2% 0'};
    width:${props => props.width || '100%'}
`;

export const InputLogin = styled.input`
    border-radius: 25px;
    outline: 0;
    padding: 0.5em;
    box-shadow: 1px 2px rgba(0,0,0,0.5);
    border: 1px solid;
`;

export const ButtonLogin = styled.button`
    border-radius: 25px;
    padding: 0.5em;
    outline: 0;
    border: 1px solid;
    font-weight: bold;
    width: 100%;
    background-color:${props => props.bgColor ? props.bgColor : '#fff'};
    &:hover{
        cursor: pointer;
    }
`;

export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0,0,0);
    border-radius: 10px;
    box-shadow: 2px 4px rgba(0,0,0,0.5);
    padding: 1em 3em 1em 3em;
`;