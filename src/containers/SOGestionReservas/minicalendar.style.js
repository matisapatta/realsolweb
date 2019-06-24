import styled from 'styled-components';
import { palette } from 'styled-theme';

// import { transition, borderRadius } from '../../config/style-util';
import WithDirection from '../../config/withDirection';

const WDCalendarStyleWrapper = styled.div`
&.isomorphicCalendarWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px 35px;
  @media (max-width: 767px) {
    padding-top: 20px;
  }
  .isomorphicCalendar {
    height: 100vh;
    //padding: 30px;
    background: #fff;
    //border-radius: 10px;
    flex-shrink: 0;
    border: 1px solid ${palette('border', 0)};
  }
}
/*Reset*/
.rdt {
  /*background: offWhite;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(206,206,206,1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(206,206,206,1);
  box-shadow: 0px 2px 5px 0px rgba(206,206,206,1);
  font-size: 1.6rem;
  width: 30rem;*/

  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}


.rdt thead th {
  padding: 0.6rem;
}


.rdtPicker{
  background: white;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  padding: 20px;
  //width: 28rem;
}


.rdtPicker table{
  margin: 0 auto;
}


.rdtPicker th,
.rdtPicker td {
  height: 2rem;
  padding: 0.6rem;
  text-align: center;
}


.rdtPicker td {
  cursor: pointer;
}


.rdtSwitch {
  font-size: 2rem;
  font-weight: 700;
}

.rdtTimeToggle,
.rdtDay,
.rdtHour,
.rdtMinute,
.rdtSecond{
  font-weight: 400;
  &:hover {
    background: darkgrey;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
  }

}


.rdtOld,
.rdtNew {
  color: #a5a5a5;
}


.rdtToday {
  position: relative;
}


.rdtToday::before {
  border-bottom: 0.7rem solid red;
  border-left: 0.7rem solid transparent;
  bottom: 0.4rem;
  content: '';
  display: inline-block;
  position: absolute;
  right: 0.4rem;
}


.rdtActive {
  background: ${palette('primary', 0)};
  color: #fff;
  &:hover {
    background: darkgrey;
    color: #fff;
  }
}



.rdtActive.rdtToday {
  &::before {
    border-bottom-color: #fff;
  }
}


th.rdtDisabled,
td.rdtDisabled,
span.rdtDisabled {
  background: none;
  color: lightgrey;
  cursor: not-allowed;
  &:hover {
    background: none;
    color: lightgrey;
    cursor: not-allowed;
  }
}


span.rdtOld {
  color: grey;
}


th.dow {
  font-weight: 600;
  width: 2rem;
  
}

// .rdtDay
//   width 2rem

th.rdtNext,
th.rdtPrev {
  font-size: 2.2rem;
  vertical-align: top;
}


rdtPrev span,
rdtNext span {
  display: block;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}


.rdtPicker thead tr:first-child th {
  cursor: pointer;
  &:hover {
    background: lightgrey;
    color: darkgrey;
  }
}



td.rdtMonth,
td.rdtYear {
  cursor: pointer;
  font-size: 1.8rem;
  height: 5rem;
  width: 2rem;
  &:hover {
    background: lightgrey;
    color: darkgrey;
    font-weight: 500;
  }
}

.rdtToday {
  &::before {
    border-bottom: 7px solid ${palette('primary', 11)};;
  }
 

}

`;

const WDCalendarModalBody = styled.div`
  color: #000000;
  .isoCalendarInputWrapper {
    width: 100%;
    margin-bottom: 15px;
  }

  .isoCalendarDatePicker {
    display: flex;

    .ant-calendar-picker {
      width: calc(100% - 35px) !important;

      .ant-input {
        border-radius: ${props =>
    props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px'};
      }

      &:hover {
        z-index: 1;
      }
    }

    .isoDeleteBtn {
      width: 35px;
      height: 35px;
      padding: 0;
      display: flex;
      flex-shrink: 0;
      margin: ${props =>
    props['data-rtl'] === 'rtl' ? '0 -1px 0 0' : '0 0 0 -1px'};
      align-items: center;
      justify-content: center;
      border-radius: ${props =>
    props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0'};

      &:hover {
        z-index: 1;
      }
    }
  }
`;

const CalendarStyleWrapper = WithDirection(WDCalendarStyleWrapper);
const CalendarModalBody = WithDirection(WDCalendarModalBody);
export { CalendarStyleWrapper, CalendarModalBody };
