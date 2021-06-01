import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from './fragments/ClearIcon';
import Color from './constants/Color';
import DropdownItem from './fragments/DropdownItem';
import Dropdown from './fragments/Dropdown';
import useClickOut from './hooks/useClickOut';

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
  const { options: optionsProps, style, className, onChange } = props;

  const [value, setValue] = useState('');
  const [preview, setPreview] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [openedDropdown, setIsOpenedDropdown] = useState(false);
  const [options, setOptions] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    if (hoveredIndex === -1 || hoveredIndex === options.length) {
      return setPreview(value);
    }
    const hoveredValue = options?.[hoveredIndex]?.value;
    return setPreview(hoveredValue);
  }, [hoveredIndex]);

  useEffect(() => {
    if (!openedDropdown) {
      setHoveredIndex(-1);
    }
  }, [openedDropdown]);

  const handleRefineOptions = (updatedValue) => optionsProps.filter(option => option.value?.toLowerCase().startsWith(updatedValue?.toLowerCase()));

  const handleChange = (updatedValue, forceCloseDropdown = false) => {
    const updatedOptions = handleRefineOptions(updatedValue);
    setOptions(updatedOptions);
    if (!forceCloseDropdown) {
      setIsOpenedDropdown(updatedValue.length > 0 && updatedOptions.length > 0);
    } else {
      setIsOpenedDropdown(false);
    }
    setValue(updatedValue);
    setPreview(updatedValue);
    onChange?.(updatedValue);
  };

  const handleKeyPress = (e) => {
    if (!openedDropdown) return;
    if (e.key === 'ArrowDown') {
      const updatedIndex = (hoveredIndex + 1) % (options.length + 1);
      setHoveredIndex(updatedIndex);
    } else if (e.key === 'ArrowUp') {
      const updatedIndex = ((hoveredIndex - 1) + (options.length + 1)) % (options.length + 1);
      setHoveredIndex(updatedIndex);
    } else if (e.key === 'Enter') {
      const selectedValue = options?.[hoveredIndex]?.value;
      handleChange(selectedValue, true);
    }
  };

  const handleClickOut = () => setIsOpenedDropdown(false);
  const dropdown = useClickOut(handleClickOut);

  return (
    <Container style={style} className={className}>
      <Input
        type="text"
        value={preview}
        onChange={(e) => handleChange(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyPress}
      />
      <Clear>
        <ClearIcon
          size={16}
          onClick={() => handleChange('', true)}
          onKeyPress={(e) => e.key === 'Enter' && handleChange('', true)}
        />
      </Clear>
      {openedDropdown && (
        <Dropdown ref={dropdown}>
          {options.map((option, index) => (
            <DropdownItem
              hovered={hoveredIndex === index}
              key={option.value}
              value={option.value}
              render={option.render}
              leftContent={option.leftContent}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => handleChange(option.value, true)}
            />
          ))}
        </Dropdown>
      )}
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
