import { useEffect, useRef } from 'react';

const useClickOut = (onClickOut, externalRef) => {
  let ref = useRef();
  if (externalRef) {
    ref = externalRef;
  }

  const isClickStartedIn = useRef(false);

  useEffect(() => {
    const handleInsideClick = (event) => {
      isClickStartedIn.current = ref?.current?.contains(event.target);
    };

    const handleOutsideClick = (event) => {
      if (!isClickStartedIn.current && !ref?.current?.contains(event.target)) {
        onClickOut(event);
      }
    };

    document.addEventListener('mousedown', handleInsideClick);
    document.addEventListener('touchstart', handleInsideClick);
    document.addEventListener('mouseup', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleInsideClick);
      document.removeEventListener('touchstart', handleInsideClick);
      document.removeEventListener('mouseup', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [ref, onClickOut]);

  return ref;
};

export default useClickOut;
