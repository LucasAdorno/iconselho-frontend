import React from 'react';

import { Container } from './styles';

function CategoryCard(props) {
  return (
    <Container bg={props.bg} percent={props.percent}>
      <header id="card-header">
        <h1 id="text-card-header">Matérias {props.title}</h1>
      </header>
      <div id="back-progress-bar">
        <h1>{props.percent}%</h1>
        <div id="progress-bar">
        </div>
      </div>
      <div id="disciplines">
        {props.disciplines.map(i => 
          <h1 className="discipline-text" key={i.cod} >{i.cod+'-'+i.name+"  "+i.ch+"h"}</h1>
          )
        }
      </div>
      <h1 id="request-hours">São necessárias {props.hours}h</h1>
    </Container>
  );
}

export default CategoryCard;