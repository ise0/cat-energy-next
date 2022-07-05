import { RefObject, useEffect, useState } from 'react';

const usePressState = (ref: RefObject<HTMLElement>, pressKey: ' ' | 'Enter') => {
  const [isPressed, setIsPressed] = useState(false);

  const elem = ref.current;

  useEffect(() => {
    const onPointerUp = () => {
      setIsPressed(false);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('dragend', onPointerUp);
    };
    const onPointerDown = () => {
      setIsPressed(true);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('dragend', onPointerUp);
    };

    elem?.addEventListener('mousedown', onPointerDown);

    return () => {
      elem?.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('dragend', onPointerUp);
    };
  }, []);

  useEffect(() => {
    const onKeyUp = (evt: KeyboardEvent) => {
      if (evt.key === pressKey) {
        setIsPressed(false);
        window.removeEventListener('keyup', onKeyUp);
      }
    };

    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === pressKey) {
        setIsPressed(true);
        window.addEventListener('keyup', onKeyUp);
      }
    };

    elem?.addEventListener('keydown', onKeyDown);

    return () => {
      elem?.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return isPressed;
};

export default usePressState;
