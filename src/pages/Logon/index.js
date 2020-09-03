import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoIcon from '../../assets/icon-logo.png';
import api from '../../services/api';

import './styles.css';

export default function Logon(){
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email, info });

            localStorage.setItem('email', email);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('siac', response.data.user.siac);
            localStorage.setItem('token', response.data.token);
            response.data.user.check === 'true' ? history.push('/profile') : alert('Por favor, verifique sua caixa de email e confirme a sua conta');
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
                    
                    <input 
                    required
                    placeholder="Sua email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    required
                    placeholder="Senha"
                    type='password'
                    value={info}
                    onChange={e => setInfo(e.target.value)}
                    />
                    <Link id='recovery-pass' to='/recovery'>Esqueci minha senha</Link>
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