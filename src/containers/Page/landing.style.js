import styled from 'styled-components';
import bgImage from '../../image/disc1.png';
import bgImage2 from '../../image/sheet1.png';

const FirstSectionWrapper = styled.div`
font-family: 'Roboto', sans-serif;
 .firstSection {
    background-image: url(${ bgImage});
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
}

.secondSection {
    background-image: url(${ bgImage2});
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 300px;
}

@media(max-width: 800px){
    .firstSection {
        background-attachment: scroll;
    }
    .secondSection {
        background-attachment: scroll;
    }
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

.firstSection h3 {
    font-size: 100px;
    text-align: center;
    padding-top: 200px;
    padding-bottom:30px;
    text-transform: uppercase;
}

.firstSection h4 {
    font-size: 20px;
    text-align: center;
    //padding-top: 200px;
    //padding-bottom:30px;
    text-transform: uppercase;
}

.searchSection {
    height: 300px;
    text-align: center;
    font-size: 24px;
}

.searchSection h3 {
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;

}

.searchButton {
    width: 300px;
    text-transform: uppercase;
}

.textPg {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 30px;
    font-size: 20px;
}

.iconPg {
    font-size: 80px;
    padding: 30px;
}


.footer {
    height: 80px;
    background-color: #101010;
    color: grey;
    text-align: center;
    font-size: 20px;
}

.footer p {
    padding: 15px;
}

`

export { FirstSectionWrapper }
