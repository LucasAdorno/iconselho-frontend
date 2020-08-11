import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import iconLogo from '../../assets/icon-logo.png';
import termsIcon from '../../assets/terms-icon.svg';

import api from '../../services/api';

import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bi, setBi] = useState('art');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            bi
        };

        try {
            api.post('users', data);
            alert(`Seu ID de acesso foi enviado para seu email.`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <div id="header-register">
                    <img src={iconLogo} alt="logo icon-lab " />
                </div>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome de usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder=" E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <select onChange={e => setBi(e.target.value)}>
                        <option value='art'> Artes</option>
                        <option value='cet'> Ciência e tecnologia</option>
                        <option value='hum'> Humanidades</option>
                        <option value='sau'> Saúde</option>
                    </select>

                    <button className="button" type="submit">Finalizar cadastro</button>
                </form>
                <section id='footer-register'>
                    <Link className="import-link" to="/">
                        <img src={termsIcon} alt='termos de serviço' />
                         Termos de Serviço
                    </Link>
                    <Link className="import-link" to="/">
                        <div><FiArrowLeft size={16} color="#E02041" /></div>
                         Voltar para o Login
                    </Link>
                </section>
            </div>
        </div>
    );
}