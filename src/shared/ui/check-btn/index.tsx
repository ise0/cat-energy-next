import cn from 'classnames';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import { getStyles, TModifiers } from './styles';

type TCheckBtn = (props: {
  className?: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  label: string;
  name?: string;
  onChange?: () => void;
  modifiers: TModifiers;
}) => JSX.Element;

const CheckBtn: TCheckBtn = ({
  className,
  type = 'checkbox',
  checked,
  label,
  name,
  onChange,
  modifiers,
}) => {
  const labelRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isPressed = usePressState(labelRef, ' ');
  const [isFocused, setIsFocused] = useState(false);

  const styles = getStyles(modifiers);
  return (
    <label
      className={cn(
        className,
        styles['check-btn'],
        isHovered && styles['check-btn_is-hovered'],
        isPressed && styles['check-btn_is-pressed'],
        checked && styles['check-btn_is-checked'],
        isFocused && styles['check-btn_is-focused']
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={labelRef}
    >
      <span className={cn(styles['check-btn__ctrl'])}>
        <input
          className={cn(styles['check-btn__input'])}
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </span>
      <span className={cn(styles['check-btn__label'])}>{label}</span>
    </label>
  );
};

export default CheckBtn;
