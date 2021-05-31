import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  height: 48px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const DropdownItem = (props) => {
  const { value, name, render, leftContent, onClick } = props;

  console.log(value, name, render, leftContent, onClick);

  return (
    <Container onClick={() => onClick?.(value)}>
      {render ? render?.()
        : (
          <div>{name}</div>
        )}
    </Container>
  );
};

DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  render: PropTypes.func,
  leftContent: PropTypes.element,
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  name: undefined,
  render: undefined,
  leftContent: undefined,
  onClick: undefined,
};

export default DropdownItem;
