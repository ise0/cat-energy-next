import cn from 'classnames';
import { getStyles, TModifiers } from './styles';

type TTextArea = (props: {
  className?: string;
  label: string;
  placeholder?: string;
  modifiers: TModifiers;
}) => JSX.Element;

const TextArea: TTextArea = ({ className, label, placeholder = '', modifiers }) => {
  const styles = getStyles(modifiers);
  return (
    <textarea
      className={cn(styles['text-area'], className)}
      placeholder={placeholder}
      aria-label={label}
    />
  );
};

export default TextArea;
