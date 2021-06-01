import styled from 'styled-components';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  border-radius: 4px;
  box-shadow: rgb(64 64 64 / 20%) 0 2px 20px;
  max-height: 196px;
  overflow: auto;
`;

const Dropdown = forwardRef((props, ref) => {
  const { children } = props;

  return (
    <Container ref={ref}>
      {children}
    </Container>
  );
});

Dropdown.propTypes = {
  /** Content of autocomplete */
  children: PropTypes.any,
};

Dropdown.defaultProps = {
  children: undefined,
};

export default Dropdown;
