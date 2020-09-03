import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import iconLogo from '../../assets/icon-logo.png';
import { Container } from './styles';
import api from '../../services/api';

export default function Update({match}) {

  const [info, setInfo] = useState('');
  const history = useHistory();

  const HandleRecovery = () => {
    const user_id = match.params.id;
    api.post('update', { info, user_id }).then(()=>{
      alert('Senha alterada com sucesso!')
      history.push('/')
    }).catch(()=>{
      alert('Falha ao alterar a senha!')
    })
  }

  return (
    <Container>
      <img src={iconLogo} alt='logo do laboratorio icon' />
      <input placeholder='Nova senha'
        value={info}
        type='password'
        onChange={(e) => setInfo(e.target.value)} />
      <button onClick={() => HandleRecovery()} > Alterar </button>
    </Container>
  );
}