import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from '../constants/Color';

const Container = styled.div`
  border-radius: 100%;
  height: ${p => `${p.size + 2}px`};
  width: ${p => `${p.size + 2}px`};
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  :hover{
    background-color: ${Color.GRAY_LIGHT};
  }
  
  :focus{
    border: ${`1px solid ${Color.BLACK}`};
    outline: 0;
    background-color: ${Color.GRAY_DARK};
  }
`;

const ClearIcon = (props) => {
  const { size, color, ...otherProps } = props;

  return (
    <Container size={size} tabIndex={0} {...otherProps}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.13807 4.19477C4.87772 3.93442 4.45561 3.93442 4.19526 4.19477C3.93491 4.45512 3.93491 4.87723 4.19526 5.13758L7.05719 7.99951L4.19526 10.8614C3.93491 11.1218 3.93491 11.5439 4.19526 11.8043C4.45561 12.0646 4.87772 12.0646 5.13807 11.8043L8 8.94232L10.8619 11.8043C11.1223 12.0646 11.5444 12.0646 11.8047 11.8043C12.0651 11.5439 12.0651 11.1218 11.8047 10.8614L8.94281 7.99951L11.8047 5.13758C12.0651 4.87723 12.0651 4.45512 11.8047 4.19477C11.5444 3.93442 11.1223 3.93442 10.8619 4.19477L8 7.0567L5.13807 4.19477Z"
          fill={color}
        />
      </svg>
    </Container>
  );
};

ClearIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

ClearIcon.defaultProps = {
  size: 24,
  color: Color.BLACK,
};

export default ClearIcon;
