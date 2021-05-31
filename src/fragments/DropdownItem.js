import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from '../constants/Color';

const Container = styled.div`
  height: 48px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: ${p => p.hovered && Color.GRAY_LIGHT};
`;

const Left = styled.div`
  margin-right: 8px;
`;

const DropdownItem = (props) => {
  const { value, render, leftContent, onClick, hovered, onMouseEnter, onMouseLeave } = props;

  return (
    <Container
      tabIndex="0"
      onClick={onClick}
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {render ? render?.()
        : (
          <>
            {leftContent && (<Left>{leftContent}</Left>)}
            {value}
          </>
        )}
    </Container>
  );
};

DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  render: PropTypes.func,
  hovered: PropTypes.bool,
  leftContent: PropTypes.element,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

DropdownItem.defaultProps = {
  render: undefined,
  leftContent: undefined,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  hovered: false,
};
export default DropdownItem;
