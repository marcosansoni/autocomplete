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

const optionsA = [
  {
    value: 'c'
  },
  {
    value: 'i'
  },
  {
    value: 'a'
  },
];

const Autocomplete = (props) => {
  const { options, style, className, onChange } = props;

  const [value, setValue] = useState('');
  const [preview, setPreview] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [openedDropdown, setIsOpenedDropdown] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const handleKeyPressItem = (e) => {
      // e.preventDefault();
      if (e.key === 'ArrowDown') {
        return setHoveredIndex(index => {
          const updatedIndex = (index + 1) % (options.length + 1);
          // console.log('Down');
          // console.log(updatedIndex);
          // console.log(options?.[updatedIndex]?.value);
          // console.log(value);
          if (updatedIndex === -1) {
            // setPreview(value);
            inputRef.current?.focus();
          } else {
            // setPreview(options?.[updatedIndex]?.value);
            inputRef.current?.blur();
          }
          return updatedIndex;
        });
      }
      if (e.key === 'ArrowUp') {
        return setHoveredIndex(index => {
          const updatedIndex = ((index - 1) + (options.length + 1)) % (options.length + 1);
          // console.log('Up');
          // console.log(updatedIndex);
          // console.log(options?.[updatedIndex]?.value);
          // console.log(value);
          if (updatedIndex === options.length) {
            // setPreview(value);
            inputRef.current?.focus();
          } else {
            // setPreview(options?.[updatedIndex]?.value);
            inputRef.current?.blur();
          }
          return updatedIndex;
        });
      }
      if (e.key === 'Enter' && hoveredIndex !== -1) {
        const updatedValue = options?.[hoveredIndex]?.value;
        setPreview(updatedValue);
        setValue(updatedValue);
        inputRef?.current?.focus();
        setIsOpenedDropdown(false);
        return setHoveredIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyPressItem);
    return () => {
      window.removeEventListener('keydown', handleKeyPressItem);
    };
  }, []);

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

  const handleChange = (e) => {
    const updatedValue = e.target.value;
    if (updatedValue.length > 0 && options.length) setIsOpenedDropdown(true);
    setValue(updatedValue);
    setPreview(updatedValue);
    onChange?.(updatedValue);
  };

  const handleReset = () => {
    setValue('');
    setPreview('');
    setIsOpenedDropdown(false);
    onChange?.('');
  };

  const handleKeyPressReset = (e) => {
    if (e.key === 'Enter') handleReset();
  };

  const handleMouseEnterItem = (updatedValue, index) => {
    inputRef.current?.blur();
    setHoveredIndex(index);
  };

  const handleMouseLeaveItem = () => {
    setHoveredIndex(-1);
  };

  const handleClickItem = (updatedValue) => {
    setPreview(updatedValue);
    setValue(updatedValue);
    setIsOpenedDropdown(false);
  };

  const handleClickOut = () => {
    setIsOpenedDropdown(false);
  };

  const dropdown = useClickOut(handleClickOut);

  return (
    <Container style={style} className={className}>
      <Input type="text" value={preview} onChange={handleChange} ref={inputRef} />
      <Clear>
        <ClearIcon
          size={16}
          onClick={handleReset}
          onKeyPress={handleKeyPressReset}
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
              onMouseEnter={() => handleMouseEnterItem(option.value, index)}
              onMouseLeave={handleMouseLeaveItem}
              onClick={() => handleClickItem(option.value)}
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
  // options: [],
  options: optionsA,
  className: undefined,
  onChange: undefined,
};

export default Autocomplete;
