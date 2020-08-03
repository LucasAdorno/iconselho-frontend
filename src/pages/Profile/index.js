import React, { useEffect, useState } from 'react';

import { FiPower } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
        })
    }, [userId]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            cpf,
            password,
            userId
        };

        try {
            const response = await api.post('profile', data);

            localStorage.setItem('dados', response.data);
        }catch(err){
            console.error()
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>

                <span>Bem vindo(a), {userName}</span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <section className="form">

                <form onSubmit={handleSubmit}>
                    <h1>Insira suas informações do SIAC</h1>

                    <input placeholder="CPF"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    />
                    <input placeholder="Senha"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}