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
  cursor: pointer;
`;

const Left = styled.div`
  margin-right: 8px;
`;

const DropdownItem = (props) => {
  const { value, leftContent, onClick, hovered, onMouseEnter, onMouseLeave } = props;

  return (
    <Container
      tabIndex="0"
      onClick={onClick}
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {leftContent && (<Left>{leftContent}</Left>)}
      {value}
    </Container>
  );
};

DropdownItem.propTypes = {
  /** text showed into items */
  value: PropTypes.string.isRequired,
  /** If true item is highlighted */
  hovered: PropTypes.bool,
  /** Custom content on the left of the items */
  leftContent: PropTypes.element,
  /** Callback triggered on click of the item */
  onClick: PropTypes.func,
  /** Callback used when mouse hover */
  onMouseEnter: PropTypes.func,
  /** Callback used when mouse leave */
  onMouseLeave: PropTypes.func,
};

DropdownItem.defaultProps = {
  leftContent: undefined,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  hovered: false,
};

export default DropdownItem;
