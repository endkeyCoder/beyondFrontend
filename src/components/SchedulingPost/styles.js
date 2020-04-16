import styled from 'styled-components';

export const Container = styled.div`
    display: ${props => props.display ? props.display : 'flex'};
    flex-direction: ${props => props.orientation || 'row'};
    justify-content: ${props => props.justfyContent || 'flex-start'};
    align-items: ${props => props.alignItens || 'flex-start'};
    margin:${props => props.margin || '0'};
    padding: ${props => props.padding || '0'};
    margin: 1%;
    width:${props => props.width || 'auto'};
    flex-wrap: wrap;

    @media(max-width: 600px){
        width: 100%;
    }
`;

export const SchedulingForm = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0,0,0);
    border-radius: 10px;
    box-shadow: 2px 4px rgba(0,0,0,0.5);
    padding: 1em;
    align-items: center;
    margin-bottom: 1em;
`;

export const SchedulingInput = styled.input`
    padding: 0.5em;
    border-radius: 25px;
    outline: 0;
    border: 1px solid;
    box-shadow: 1px 2px rgba(0,0,0,0.5);

    @media(max-width: 600px){
        width: -webkit-fill-available;
    }
`;

export const SchedulingTextarea = styled.textarea`
    padding: 0.5em;
    border-radius: 10px;
    outline: 0;
    border: 1px solid;
    box-shadow: 1px 2px rgba(0,0,0,0.5);
    width: -webkit-fill-available;
`;

export const SchedulingButton = styled.button`
    border: 1px solid;
    padding: 0.5em;
    border-radius: 10px;
    box-shadow: 1px 2px rgba(0,0,0,0.5);
    width: 25em;
    outline: 0;

@media(max-width: 600px){
    width: 100%;
}

    &:hover{
        cursor: pointer;
        transition: background 1s;
        background: #32CD32;
    }
`;

export const SchedulingSelect = styled.select`
    padding: 0.5em;
    border-radius: 10px;
    outline: 0;
    border: 1px solid;
    box-shadow: 1px 2px rgba(0,0,0,0.5);
    width: -webkit-fill-available;
`;

export const SchedulingOption = styled.option`
    
`;