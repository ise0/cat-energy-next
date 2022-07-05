import cn from 'classnames';
import { getStyles, TModifiers } from './styles';

type TTextInput = (props: {
  className?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  modifiers: TModifiers;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}) => JSX.Element;

const TextInput: TTextInput = ({
  className,
  label,
  name,
  placeholder = '',
  modifiers,
  value,
  onChange = () => {},
  onBlur,
}) => {
  const styles = getStyles(modifiers);
  return (
    <label className={cn(styles['text-input'], className)}>
      {label && <span className={cn(styles['text-input__label'])}>{`${label}:`}</span>}
      <input
        className={cn(styles['text-input__input'])}
        value={value}
        type="input"
        name={name}
        placeholder={placeholder}
        onChange={(input) => onChange(input.target.value)}
        onBlur={onBlur}
      />
    </label>
  );
};

export default TextInput;
