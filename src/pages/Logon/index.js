import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoIcon from '../../assets/icon-logo.png';
import api from '../../services/api';

import './styles.css';

export default function Logon(){
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id, password });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <button id="about-button" className="button">Sobre</button>
            <img src={logoIcon} alt="icon-lab" />
            <h1>Acompanhe o resumo do <br/> seu
               curso de forma <br/> simples!
            </h1>
            <section className="form">
                <form onSubmit={handleLogin}>
                    
                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <input placeholder="Senha"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
    
                    <button id="login-button" className="button" type="submit">Entrar</button>

                    <Link className="import-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

        </div>
    );
}