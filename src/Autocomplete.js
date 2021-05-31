import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from './fragments/ClearIcon';
import Color from './constants/Color';
import DropdownItem from './fragments/DropdownItem';
import Dropdown from './fragments/Dropdown';

const Input = styled.input`
  width: 100%;
  border-width: 0 0 2px;
  border-color: ${Color.BLACK};
  height: 100%;
  font-size: inherit;

  :focus {
    outline: 1px solid black;
    background-color: #f1f1f1;
  }

  :hover {
    background-color: #f1f1f1;
  }
`;

const Container = styled.div`
  width: 250px;
  height: 32px;
  margin: 4px;
  font-size: 18px;
  position: relative;
`;

const Clear = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
`;

const Autocomplete = (props) => {
  const { options, style, className, onChange } = props;
  const [value, setValue] = useState();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const updatedValue = e.target.value;
    setValue(updatedValue);
    setPreview(updatedValue);
    onChange?.(updatedValue);
  };

  const handleReset = () => {
    setValue('');
    setPreview('');
    onChange?.('');
  };

  const handleKeyPressReset = (e) => {
    if (e.key === 'Enter') handleReset();
  };

  console.log(value);
  console.log(options);

  return (
    <Container style={style} className={className}>
      <Input type="text" value={preview} onChange={handleChange} />
      <Clear>
        <ClearIcon
          size={16}
          onClick={handleReset}
          onKeyPress={handleKeyPressReset}
        />
      </Clear>
      <Dropdown>
        <DropdownItem name="c" value="c" />
      </Dropdown>
    </Container>
  );
};

Autocomplete.propTypes = {
  style: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  })),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

Autocomplete.defaultProps = {
  style: undefined,
  options: [],
  className: undefined,
  onChange: undefined,
};

export default Autocomplete;
