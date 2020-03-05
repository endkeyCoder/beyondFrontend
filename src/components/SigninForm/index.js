import React, { useState } from 'react';
import apiBeyond from '../../config/apiBeyond';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './styles.css';

export default function SigninForm() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const userSession = useSelector(state => {
        return state.userSession.infoUser;
    })

    console.log(userSession)

    async function login(e) {
        e.preventDefault();
        try {
            const res = await apiBeyond.post('/signin', {
                user, password,
            })

            if (res.data.authenticate) {

                await recordSession(res.data)
                alert('login realizado com sucesso')
                return (
                    <Redirect to={{
                        pathname: "/"
                    }} />
                )
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert('problema ao realizar login')
            console.log(error)
        }
    }

    async function recordSession(dataUser) {
        const { name, user, email, token } = dataUser
        dispatch({
            type: 'OPEN_SESSION',
            infoUser: { name, user, email, token }
        })
    }

    function handleUser(user) {
        setUser(user)
    }
    function handlePassword(password) {
        setPassword(password)
    }


    return (
        <form className="formSignin">
            <div className="headerFormSignin">
                <h2>Bem-vindo ao Beyond</h2>
            </div>
            <div className="bodyFormSignin">
                <div className="itemFormSignin">
                    <label>Usuário</label>
                    <input onChange={(e) => handleUser(e.target.value)} type="text" />
                </div>
                <div className="itemFormSignin">
                    <label>Senha</label>
                    <input onChange={(e) => handlePassword(e.target.value)} type="password" />
                </div>
                <div className="itemFormSignin">
                    <button onClick={login}>Login</button>
                </div>
            </div>
            <div className="footerFormSignin">
                <a href="/registerUser">Cadastre-se</a>
                <a href="/forgotPassword">Esqueci a senha</a>
            </div>
        </form>
    );
}
