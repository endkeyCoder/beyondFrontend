//import de libs react
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import dos arquivos de configuração
import apiBeyond from '../../config/apiBeyond';
import { setUserAuthentication } from '../../config/redux/actions';

//import dos arquivos de estilos
import { InputLogin, FormLogin, Container, ButtonLogin } from './styles';
import './styles.css';

export default function SigninForm() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const globalState = useSelector(state => state)
    async function login(e) {
        e.preventDefault();
        try {
            const resLogin = await apiBeyond.post('/login', {
                nick, password,
            })
            if (resLogin.data.message.statusCode === 200) {
                dispatch(setUserAuthentication(resLogin.data.data, resLogin.data.permissions));
            } else {
                alert(resLogin.data.message.observation);
            }
        } catch (error) {
            alert('problema ao realizar login => ', error)
            console.log(error)
            return false;
        }
    }

    function handleNick(nick) {
        setNick(nick)
    }
    function handlePassword(password) {
        setPassword(password)
    }

    if (globalState.userReducer.user.data.token !== undefined) {
        return <Redirect to={{ pathname: '/' }} />
    } else {
        return (
            <FormLogin orientation="column">
                <Container justfyContent="center">
                    <h3>Bem vindo ao Beyond</h3>
                </Container>
                <Container orientation="column" alignItens="center">
                    <Container className="itemFormSignin" orientation="column">
                        <label>Usuário</label>
                        <InputLogin type="text" onChange={(e) => handleNick(e.target.value)} />
                    </Container>
                    <Container className="itemFormSignin" orientation="column" >
                        <label>Senha</label>
                        <InputLogin type="password" onChange={(e) => handlePassword(e.target.value)} />
                    </Container>
                    <Container className="itemFormSign" orientation="column">
                        <ButtonLogin onClick={(e) => login(e)}>Login</ButtonLogin>
                    </Container>
                </Container>
            </FormLogin>
        );
    }
}
