import React, { useState, useEffect } from 'react';
import apiBeyond from '../../config/apiBeyond';

import './styles.css';

export default function RegisterUserForm() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [groups, setGroups] = useState([]);
    const [idGroup, setIdGroup] = useState(1)

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
    function handleIdGroup(idGroup) {
        setIdGroup(idGroup)
    }
    async function register(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const res = await apiBeyond.post('/setUser', {
                    nick,
                    password,
                    name,
                    email,
                    status: 'pendente',
                    block: true,
                    groupId: idGroup
                })

                alert(res.data.message.observation);
            } catch (error) {
                console.log(error)
                alert('problema ao tentar efetuar o cadastro')
            }
        } else {
            alert('senhas não conferem')
        }
    }

    useEffect(() => {
        async function loadGroups() {
            try {
                const resLoadGroups = await apiBeyond.get('/getAllUserGroups')
                if (resLoadGroups.data.data.length !== groups.length) {
                    setGroups(resLoadGroups.data.data)
                }
            } catch (error) {
                console.log('print de error em loadGroups => ', error)
                alert('problema ao carregar os grupos')
            }
        }
        loadGroups();
    })
    console.log('print de idGroup em RegisterUserForm => ', idGroup)
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
                <div className="itemRegisterUserForm">
                    <label>Grupo do Usuário</label>
                    <select onChange={(e) => handleIdGroup(e.target.value)}>
                        {
                            groups.map(group => {
                                const { name, id } = group;
                                return (
                                    <option key={name + id} value={id}>{name}</option>
                                )
                            })
                        }
                    </select>
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
