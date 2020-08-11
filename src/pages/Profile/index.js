import React, { useEffect, useState, useRef } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import ProfileCard from '../../components/ProfileCard';
import CategoryCard from '../../components/CategoryCard';
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
      formRef.current.innerHTML = '<div></div> '
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
        <span>Bem vinde, {userName}!</span>
        <FiPower id="logout" onClick={handleLogout} size={22} color="#E02041" />
      </header>
      <div ref={formRef}>
        <div className="profile-container">
          <h1 id="text-credencials">Por favor, insira as suas credenciais do SIAC</h1>
          <section className="form">
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
        </div>
      </div>
      {dados.filterObg ?
       <div>
        <ProfileCard dados={{...dados}} />
        <CategoryCard bg={'#E38627'} title="Obrigatórias" hours={dados.chEspecific[3]} percent={dados.percentObg} disciplines={dados.filterObg} />
        <CategoryCard bg={'#C13C37'} title="Artisticas" hours={dados.chEspecific[0]} percent={dados.percentArts} disciplines={dados.filterArts} />
        <CategoryCard bg={'#33e3ee'} title="Cientifícas" hours={dados.chEspecific[1]} percent={dados.percentCientific} disciplines={dados.filterCientific} />
        <CategoryCard bg={'#6A2135'} title="Humanisticas" hours={dados.chEspecific[2]} percent={dados.percentHumanity} disciplines={dados.filterHumanity} />
        <CategoryCard bg={'#33ee66'} title="Livres" hours={dados.chEspecific[4]} percent={dados.percentFree} disciplines={dados.freeComponents} />
        </div> : <></>
      }
    </>);
}