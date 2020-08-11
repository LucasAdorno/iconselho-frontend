import styled from 'styled-components';

export const Container = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 2rem auto 0;
  min-height: 20rem;
  border-radius: 8px;

  #card-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2rem;
    background: #111;
    color: #fafafa;
    border-radius: 8px 8px 0 0;
  }

  #card-header #text-card-header {
    font: 500 1rem 'Poppins';
  }

  #back-progress-bar {
    width: 96%;
    height: 2rem;
    background: #f0f0f0;
    border-radius: 20px;
    margin: 1rem 0 1rem 0;
  }

  #back-progress-bar h1 {
    width: 100%;
    text-align: center;
    font: 500 1.2rem 'Poppins';
    padding-top: 0.1rem;
    z-index: 10;
  }

  #progress-bar {
    width: ${props => props.percent}%;
    height: 2rem;
    background: ${props => props.bg};
    border-radius: 20px;
    margin-top:-2rem;
  } 

  #institucts {
    font: 600 1rem 'Poppins';
    padding: 0 1.2rem 1rem 1.2rem;
  }

  #disciplines {
    padding: 0 1rem 1rem 1rem;
    min-height:14rem;
    align-self: flex-start;
  }
  .discipline-text {
    font: 500 0.9rem 'Poppins';
  }

  #request-hours {
    align-self: flex-end;
    font: 500 1rem 'Poppins';
    padding-right: 0.4rem;
    color: #333;
  }

`;
