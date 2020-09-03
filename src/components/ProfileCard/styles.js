import styled from 'styled-components';

export const Container = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 2rem auto 0;
  max-height: 20rem;
  border-radius: 8px;

  #profile-card-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2rem;
    background: #111;
    color: #fafafa;
    border-radius: 8px 8px 0 0;
  }

  #profile-card-header #profile-card-header-text {
    font: 500 1rem 'Poppins';
  }
  
  #profile-card-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    min-height:8rem;
    padding: 1rem;
  }
  #profile-card-content .types-components-percent{
    font: 500 1rem 'Poppins';
  }
  #profile-card-content #chart {
    width: 200px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }

  #footer-profile-card{
    align-self: flex-start;
    margin-left: 1rem;
  }

  #footer-profile-card-text {
    font: 500 1rem 'Poppins';
    color: #333;
  }
`;

export const ChartBar = styled.div`

  width: 20px;
  height: ${props => props.size}px;
  background: ${props => props.bgcolor};

`;
