import React, { useEffect, useState, useRef } from 'react';

import { FiPower } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [dados, setDados] = useState('');
  const formRef = useRef();
  const buttonRef = useRef();

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
    buttonRef.current.innerText = '.  .  .';
    buttonRef.current.setAttribute('disabled', 'true');
    await api.post('profile', data).then((res) => {
      setDados(res.data);
      formRef.current.innerHTML = ' '
    }).catch((err) => {
      alert('Falha ao importar os dados!')
      buttonRef.current.innerText = 'Entrar';
      buttonRef.current.setAttribute('disabled', 'false');
    });
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
  <>
    <header id='profile-header'>
        <span>Bem vindo(a), {userName}</span>
        <FiPower id="logout" onClick={handleLogout}  size={22} color="#E02041" />
      </header>
    <div className="profile-container">
      <h1 id="text-credencials">Por favor, insira as suas credenciais do SIAC</h1>
      <section className="form" ref={formRef}>
        <form onSubmit={handleSubmit}>
          <input placeholder="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <input placeholder="Senha"
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit" ref={buttonRef}>Acessar</button>
        </form>
        <div className="footer-profile-infos">
          <h1>i</h1>
          <a id="credencials-link" className="import-link">Por que pedimos as suas credenciais?</a>
        </div>
      </section>
      {dados.filterObg ? dados.filterObg.map(i =>
        <p>{i.cod}</p>
      ) : <></>}
      {dados.filterObg ? dados.filterCientific.map(i =>
        <p>{i.cod}</p>
      ) : <></>}
      {dados.filterObg ? dados.filterHumanity.map(i =>
        <p>{i.cod}</p>
      ) : <></>}
      {dados.filterObg ? dados.filterArts.map(i =>
        <p>{i.cod}</p>
      ) : <></>}
    </div>
  </>);
}