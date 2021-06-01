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
    outline: ${`1px solid ${Color.BLACK}`};
    background-color: ${Color.GRAY_LIGHT};
  }

  :hover {
    background-color: ${Color.GRAY_LIGHT};
  }
`;

const Container = styled.div`
  height: 36px;
  margin: 4px;
  font-size: 16px;
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
  const { options: optionsProps, style, className, onChange, showClear } = props;

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

  // Refine options showed into autocomplete according with input
  const handleRefineOptions = (updatedValue) => optionsProps.filter(option => option.value?.toLowerCase().startsWith(updatedValue?.toLowerCase()));

  // Callback triggered each time a value into text input change
  // if forceCloseDropdown is true, dropdown is collapsed
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

  // Callback used to navigate between items of autocomplete
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
      {showClear && (
        <Clear>
          <ClearIcon
            size={16}
            onClick={() => handleChange('', true)}
            onKeyPress={(e) => e.key === 'Enter' && handleChange('', true)}
          />
        </Clear>
      )}
      {openedDropdown && (
        <Dropdown ref={dropdown}>
          {options.map((option, index) => (
            <DropdownItem
              hovered={hoveredIndex === index}
              key={option.value}
              value={option.value}
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
  /** Custom style object */
  style: PropTypes.object,
  /** Array of possible suggestions,
   * value represents text showed,
   * leftContent if some element has to be rendered on left */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    leftContent: PropTypes.element,
  })),
  /** Custom className */
  className: PropTypes.string,
  /** Callback triggered each time value of text input has been changed */
  onChange: PropTypes.func,
  /** If true, clear icon is shown into text input */
  showClear: PropTypes.bool,
};

Autocomplete.defaultProps = {
  style: undefined,
  options: [],
  className: undefined,
  onChange: undefined,
  showClear: false,
};

export default Autocomplete;
