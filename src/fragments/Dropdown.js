import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  border-radius: 4px;
  box-shadow: rgb(64 64 64 / 20%) 0 2px 20px;
`;

const Dropdown = (props) => {
  const { children } = props;

  return (
    <Container>
      {children}
    </Container>
  );
};

Dropdown.propTypes = {
  children: PropTypes.element,
};

Dropdown.defaultProps = {
  children: undefined,
};

export default Dropdown;