import React from 'react';
import { Container } from './styles';
import { PieChart } from 'react-minimal-pie-chart'

function ProfileCard(props) {
  return (
    <Container>
      <header id="profile-card-header">
        <h1 id="profile-card-header-text">Resumo</h1>
      </header>
      <div id="profile-card-content">
        <div id="types-components">
          <h1 className="types-components-percent">
            OB: {props.dados.percentObg}%</h1>
          <h1 className="types-components-percent">
            OZ: {props.dados.percentArts}%</h1>
          <h1 className="types-components-percent">
            OY: {props.dados.percentCientific}%</h1>
          <h1 className="types-components-percent">
            OH: {props.dados.percentHumanity}%</h1>
          <h1 className="types-components-percent">
            LV: {props.dados.percentFree}%</h1>
        </div>
        <div id="chart">
          <PieChart
            viewBoxSize={[160, 160]}
            data={[
              { title: 'Obrigatorias', value: props.dados.obgCh, color: '#E38627' },
              { title: 'Artisticas', value: props.dados.artsCh, color: '#C13C37' },
              { title: 'Cientificas', value: props.dados.cientificCh, color: '#33e3ee' },
              { title: 'Humanisticas', value: props.dados.humanityCh, color: '#6A2135' },
              { title: 'Livres', value: props.dados.freeCh, color: '#33ee66' },
              { title: 'Restante', value: (2040 - props.dados.totalCh), color: '#666' },
            ]}
          />
        </div>
      </div>
      <div id="footer-profile-card">
        <h1 id="footer-profile-card-text">Você possui {props.dados.totalCh}h de 2040h</h1>
        <h1 id="footer-profile-card-text">Você precisa de {props.dados.disciplinesRemain} disciplinas de 68h para formar</h1>
      </div>
    </Container>
  );
}

export default ProfileCard;