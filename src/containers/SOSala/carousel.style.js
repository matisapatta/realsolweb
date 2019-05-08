import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../config/withDirection';

// height original 160px
// background: ${palette('secondary', 4)};
const CarouselStyleWrapper = styled.div`
  .isoCarousalDemoContainer {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .ant-carousel {
    .slick-slider {
      direction: ${props => (props['data-rtl'] === 'rtl' ? 'ltr' : 'inherit')};
      .slick-track {
        left: auto;
        right: 0;

        .slick-slide {
          text-align: center;
          height: 400px; 
          line-height: 160px;
          background: white;
          color: #fff;
          overflow: hidden;
          float: left !important;
          margin-bottom: 50px;
        }
        > img {
          object-fit: contain;
        }
      }
    }
  }
`;

export default WithDirection(CarouselStyleWrapper);
