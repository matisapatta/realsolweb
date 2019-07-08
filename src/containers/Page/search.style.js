import styled from 'styled-components'
import bgImage from '../../image/disc1.png';

const SearchWrapper = styled.div`
font-family: 'Roboto', sans-serif;

.bgWrapper h1 {
    font-size: 35px;
    text-align: center;
    padding-top: 50px;
    padding-bottom:30px;
    text-transform: uppercase;
    //cursor: pointer;
}
.bgWrapper h1 a {
    color: inherit !important;
}

 .bgWrapper {
    background-image: url(${ bgImage});
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
}

.loginLinks {
    text-align: right;
    font-size: 16px;
    padding-top: 15px;
}

.linkStyle {
    padding: 15px;
    background-color: rgba(0,0,0,0.2);
}

@media(max-width: 800px){
    .bgWrapper {
        background-attachment: scroll;
    }
}

`

export { SearchWrapper }