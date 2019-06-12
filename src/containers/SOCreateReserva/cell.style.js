import styled from 'styled-components'
import { palette } from 'styled-theme';
import {
    transition,
  } from '../../config/style-util';

const CellWrapper = ComponentName => styled(ComponentName)`

overflow: hidden;
overflow-x: auto;
background-color: #ffffff;
padding: 16px 15px;
white-space: nowrap;
cursor: pointer;
text-align: center;

p {
  margin-bottom: 0;
}

font-size: 12px;
color: ${palette('text', 3)};
border-bottom: 1px solid ${palette('border', 0)};

a {
  color: ${palette('primary', 0)};
  ${transition()};

  &:hover {
    color: ${palette('primary', 4)};
  }
}

&:hover {
    background-color: rgba(197,239,247,0.3); // background-color:#c5eff7;
    ${transition()};
  }

`

const CellColumnWrapper = ComponentName => styled(ComponentName)`

overflow: hidden;
overflow-x: auto;
background-color: #ffffff;
padding: 16px 15px;
white-space: nowrap;

p {
  margin-bottom: 0;
}

font-size: 12px;
color: ${palette('text', 3)};
border-bottom: 1px solid ${palette('border', 0)};

a {
  color: ${palette('primary', 0)};
  ${transition()};

  &:hover {
    color: ${palette('primary', 4)};
  }
}
`

const CellHeaderWrapper = ComponentName => styled(ComponentName)`

color: ${palette('secondary', 2)};
font-size: 13px;
background-color: ${palette('secondary', 1)};
border-bottom: 0;
padding: 16px 15px;
white-space: nowrap;

p {
  margin-bottom: 0;
}
text-align: center;

`

export { CellWrapper, CellHeaderWrapper, CellColumnWrapper }