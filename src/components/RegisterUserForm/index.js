import React, { useState } from 'react';
import apiBeyond from '../../config/apiBeyond';

import './styles.css';

export default function RegisterUserForm() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleNick(nick) {
        setNick(nick)
    }
    function handlePassword(password) {
        setPassword(password)
    }
    function handleName(name) {
        setName(name)
    }
    function handleEmail(email) {
        setEmail(email)
    }
    function handleConfirmPassword(confirmPassword) {
        setConfirmPassword(confirmPassword)
    }
    async function register(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const res = await apiBeyond.post('/setUser', {
                    user: nick,
                    password,
                    name,
                    email,
                    status: 'pendente',
                    group: 'vendedores'
                })
                console.log(res.data);
                alert('cadastro realizado com suceso')
            } catch (error) {
                console.log(error)
                alert('problema ao tentar efetuar o cadastro')
            }
        } else {
            alert('senhas não conferem')
        }
    }

    return (
        <form className="formRegisterUser" onSubmit={register}>
            <div className="headerRegisterUserForm">
                <h2>Dados para cadastro</h2>
            </div>
            <div className="bodyRegisterUserForm">
                <div className="itemRegisterUserForm">
                    <label>Nick</label>
                    <input onChange={(e) => handleNick(e.target.value)} type="text" placeholder="nome de usuário" required />
                </div>
                <div className="itemRegisterUserForm">
                    <label>Senha</label>
                    <input onChange={(e) => handlePassword(e.target.value)} type="password" required />
                </div>
                <div className="itemRegisterUserForm">
                    <label>Confirme sua senha</label>
                    <input onChange={(e) => handleConfirmPassword(e.target.value)} type="password" required />
                </div>
                <div className="itemRegisterUserForm">
                    <label>Nome completo</label>
                    <input onChange={(e) => handleName(e.target.value)} type="text" placeholder="nome real" required />
                </div>
                <div className="itemRegisterUserForm">
                    <label>Email</label>
                    <input onChange={(e) => handleEmail(e.target.value)} type="email" required />
                </div>
            </div>
            <div className="footerRegisterUserForm">
                <div className="itemRegisterUserForm">
                    <button type="submit">Cadastrar</button>
                </div>
                <div className="itemRegisterUserForm">
                    <a href="/signin">Voltar ao login</a>
                </div>
            </div>
        </form>
    );
}
