import React, { useState } from 'react';
import apiBeyond from '../../config/apiBeyond';
import './styles.css';

export default function SigninForm() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    async function login(e) {
        e.preventDefault();
        try {
            const res = await apiBeyond.post('/signin', {
                user, password,
            })

            if (res.data.authenticate) {
                window.location.href = '/';
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            alert('problema ao realizar login')
            console.log(error)
        }

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
