import styled from 'styled-components';

const CardContentWrapper = styled.div`

&.cardContentContainer{

  display: flex;
  position: relative;
  width: 100%;

  img {
    object-fit: contain; 
    display: inline-block; 
    height: 150px;
    width: 150px;
    padding-right: 10px;
  }

  .cardContentText {
    width: 100%;
    text-align: justify;
  }
}
`;

export { CardContentWrapper }