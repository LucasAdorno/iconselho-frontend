import React, { useEffect, useState, useRef } from 'react';

import { FiPower } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

  const history = useHistory();
  const formSiac = useRef();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [dados, setDados] = useState('')

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

    formSiac.current.innerHTML = '<h1> Aguarde... </h1>'

    const data = {
      cpf,
      password,
      userId
    };

    try {
      const response = await api.post('profile', data);
      setDados(response.data);

    } catch (err) {
      console.error()
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>

        <span>Bem vindo(a), {userName}</span>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <section className="form">

        <form onSubmit={handleSubmit} ref={formSiac}>
          <h1>Insira suas credenciais do SIAC</h1>

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
      <section id='Obrigatórias'>
        {dados.filterObg ? formSiac.current.innerHTML = ' ' : <></>}
        {dados.filterObg ?
          dados.validsValue.map(discipline => <div><p>{discipline.cod} {discipline.name}</p></div>)
          :
          <></>
        }
      </section>

    </div>
  );
}