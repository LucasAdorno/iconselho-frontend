import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoIcon from '../../assets/icon-logo.png';

import { Container } from './styles';

function CheckMail({ match }) {

  const [checked, setChecked] = useState('está pendente')

  useEffect(() => {
    const user_id = match.params.id
    api.post('check', { user_id }).then(() =>
      setChecked('foi verificado')
    )
  }, [match.params.id])

  return (
    <Container>
      <img src={logoIcon} alt='logo do laboratorio icon' />
      <h1>Seu email {checked}</h1>
      <Link to='/'>
        <button>
          Login
        </button>
      </Link>
    </Container>
  );
}

export default CheckMail;