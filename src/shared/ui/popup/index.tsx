import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import AnchorPopup from './popup-types/anchor';
import { TPopupPositionTypes } from './types';
import { getStyles, TModifiers } from './styles';

const isServer = typeof window === 'undefined';
const modalRoot = isServer ? undefined : (document.getElementById('modal-root') as HTMLElement);

type TPopup = (props: {
  children: ReactNode;
  autoClose?: () => void;
  hasFocus?: boolean;
  modifiers: TModifiers;
  position: TPopupPositionTypes[keyof TPopupPositionTypes];
}) => JSX.Element;

const Popup: TPopup = ({ children, autoClose, hasFocus, position, modifiers }) => {
  const styles = getStyles(modifiers);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutsideClick = (evt: Event) => {
      if (autoClose && ref.current && !ref.current.contains(evt.target as Node)) autoClose();
    };
    document.addEventListener('click', onOutsideClick, true);
    return () => document.removeEventListener('click', onOutsideClick, true);
  }, []);

  useEffect(() => {
    if (hasFocus) {
      const outerFocusElementRef = document.activeElement;
      ref.current?.focus({ preventScroll: true });
      return () => {
        if (outerFocusElementRef) (outerFocusElementRef as HTMLElement).focus();
      };
    }
  }, []);

  let popup: JSX.Element;
  const tabIndex = hasFocus ? 0 : undefined;
  const lastFocusableElem = autoClose && <div tabIndex={0} onFocus={autoClose} />;
  switch (position.type) {
    default:
      popup = (
        <AnchorPopup position={position.value} popupRef={ref} tabIndex={tabIndex} styles={styles}>
          {children}
          {lastFocusableElem}
        </AnchorPopup>
      );
      break;
  }
  if (!modalRoot) return popup;
  
  return ReactDOM.createPortal(popup, modalRoot);
};

export default Popup;
