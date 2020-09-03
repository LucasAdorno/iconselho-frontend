import React, { useEffect, useState, useRef } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import ProfileCard from '../../components/ProfileCard';
import CategoryCard from '../../components/CategoryCard';
import './styles.css';

export default function Profile() {

  const history = useHistory();
  const email = localStorage.getItem('email');
  const userName = localStorage.getItem('userName');
  const [siac1, setSiac1] = useState('');
  const [siac2, setSiac2] = useState('');
  const [dados, setDados] = useState();
  const formRef = useRef();
  const buttonRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.post('verify', { token }).then(() => {

      if (localStorage.getItem('siac') !== 'null') {

        setDados(JSON.parse(localStorage.getItem('siac')));
        formRef.current.innerHTML = '<div></div> '

      }

    }).catch(() => {

      localStorage.clear();
      history.push('/');

    })
  }, [history]);

  async function handleSubmit(e) {

    e.preventDefault();
    const token = localStorage.getItem('token');

    api.post('verify', { token }).then(async () => {

      const data = {
        siac1,
        siac2,
        email
      };

      buttonRef.current.innerText = '.  .  .';
      buttonRef.current.setAttribute('disabled', 'true');

      await api.post('profile', data).then(res => {

        localStorage.setItem('siac', JSON.stringify(res.data));
        setDados(res.data);
        buttonRef.current.innerText = 'Importar';

        if (modalRef) {
          modalRef.current.style.visibility = 'hidden';
        }

        formRef.current.innerHTML = '<div></div> '

        setSiac1('');
        setSiac2('');

      }).catch(() => {

        alert('Falha ao importar os dados!')
        buttonRef.current.innerText = 'Importar';
        buttonRef.current.removeAttribute('disabled');

      });
    }).catch(() => {

      localStorage.clear();
      history.push('/')

    })
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
              <input
                required
                placeholder="CPF"
                value={siac1}
                onChange={e => setSiac1(e.target.value)}
              />
              <input
                required
                placeholder="Senha"
                type='password'
                value={siac2}
                onChange={e => setSiac2(e.target.value)}
              />

              <button className="button" type="submit" ref={buttonRef}>Acessar</button>
            </form>
            <div className="footer-profile-infos">
              <h1>i</h1>
              <p id="credencials-link" className="import-link">Por que pedimos as suas credenciais?</p>
            </div>
          </section>
        </div>
      </div>
      {dados ?
        <>
          <button id='open-modal' onClick={() => modalRef.current.style.visibility = 'visible'}>Importar dados novamente</button>
          <div>
            <ProfileCard dados={{ ...dados }} />
            <CategoryCard
              text="obrigatórias da sua grade"
              bg={'#E38627'}
              title="Obrigatórias" hours={dados.chEspecific[3]} percent={dados.percentObg} disciplines={dados.filterObg} />
            <CategoryCard
              text={"com o código: DAN, EBA, MUS, LET, TEA ou que sejam " + dados.relativeNat[0]}
              bg={'#C13C37'}
              title="Artisticas" hours={dados.chEspecific[0]} percent={dados.percentArts} disciplines={dados.filterArts} />
            <CategoryCard
              text={"com o código: ARQ, BIO, ENF, ENG, FAR, FIS, FOF GEO, ICS, MAT, MED, MEV, QUI ou que sejam " + dados.relativeNat[2]}
              bg={'#33e3ee'}
              title="Cientifícas" hours={dados.chEspecific[1]} percent={dados.percentCientific} disciplines={dados.filterCientific} />
            <CategoryCard
              text={"com o código: ADM, COM, DIR, ECO, EDC, FCC, FCH, ICI, IPS ou que sejam " + dados.relativeNat[1]}
              bg={'#6A2135'}
              title="Humanisticas" hours={dados.chEspecific[2]} percent={dados.percentHumanity} disciplines={dados.filterHumanity} />
            <CategoryCard
              text="de qualquer instituto da UFBA"
              bg={'#33ee66'}
              title="Livres" hours={dados.chEspecific[4]} percent={dados.percentFree} disciplines={dados.freeComponents} />
          </div>
          <section id='modal'
            ref={modalRef}
          >
            <div id='modal-form'>

              <h1>Importe novamente seus dados do SIAC!</h1>
              <input
                required
                placeholder="CPF"
                value={siac1}
                onChange={e => setSiac1(e.target.value)}
              />
              <input
                required
                placeholder="Senha"
                type='password'
                value={siac2}
                onChange={e => setSiac2(e.target.value)}
              />
              <button className="button"
                onClick={(e) => handleSubmit(e)}
                type="submit"
                ref={buttonRef}>Importar</button>
              <button id='modal-close'
                onClick={() => modalRef.current.style.visibility = 'hidden'}
              >Fechar</button>
            </div>
          </section> </> : <></>
      }
    </>);
}