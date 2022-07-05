import cn from 'classnames';
import { getStyles, TModifiers } from './styles';

type TSpin = (props: { className?: string; modifiers: TModifiers }) => JSX.Element;

const Spin: TSpin = ({ className, modifiers }) => {
  const styles = getStyles(modifiers);
  return <div className={cn(className, styles['spin'])} role="status" />;
};

export default Spin;