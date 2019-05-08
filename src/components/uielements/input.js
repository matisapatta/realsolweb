import { Input } from 'antd';
import {
  BigInputWrapper,
  InputWrapper,
  InputGroupWrapper,
  BigInputSearchWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '../../config/withDirection';

const { Search, TextArea, Group } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDBigInputSearch = BigInputSearchWrapper(Search);
const BigInputSearch = WithDirection(WDBigInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export { BigInputSearch, InputSearch, InputGroup, Textarea };
