import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../config/style-util';
import WithDirection from '../../config/withDirection';


const WDButtonWrapper = styled.div`



@media only screen and (max-width: 767px) {
  //padding: 30px 20px;
}
.isoContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .isoControlBtnGroup {
      display: flex;
      align-items: center;

      .isoControlBtn {
        font-size: 16px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette('primary', 0)};
        border: 0;
        outline: 0;
        height: 30px;
        padding: 0 15px;
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '10px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : '0')};
        cursor: pointer;
        ${borderRadius('3px')};
        ${transition()};

        i {
          padding-right: ${props =>
            props['data-rtl'] === 'rtl' ? '0' : '10px'};
          padding-left: ${props =>
            props['data-rtl'] === 'rtl' ? '10px' : '0'};
        }

        &:last-child {
          margin: 0;
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }
  }`

const ButtonWrapper = WithDirection(WDButtonWrapper);
export { ButtonWrapper }