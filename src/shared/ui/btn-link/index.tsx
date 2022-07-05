import cn from 'classnames';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import { getStyles, TModifiers } from './styles';

type TCommonProps = {
  className?: string;
  text: string;
  checked?: boolean;
  modifiers: TModifiers;
  onClick?: () => void;
};

type TBtnProps = TCommonProps & {
  type: 'button' | 'submit' | 'reset';
};

type TLinkProps = TCommonProps & {
  href: string;
  type: 'link';
};

type TBtnLink = (props: TBtnProps | TLinkProps) => JSX.Element;

const BtnLink: TBtnLink = (props) => {
  const { className, text, checked, modifiers, onClick, type } = props;
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isPressed = usePressState(ref, type === 'link' ? 'Enter' : ' ');

  const styles = getStyles(modifiers);

  return type === 'link' ? (
    <Link href={props.href}>
      <a
        className={cn(
          className,
          styles['btn-link'],
          isHovered && styles['btn-link_is-hovered'],
          isPressed && styles['btn-link_is-pressed'],
          checked && styles['btn-link_is-checked']
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
        onClick={onClick}
      >
        <span className={cn(styles['btn-link__text'])}>{text}</span>
      </a>
    </Link>
  ) : (
    <button
      className={cn(
        className,
        styles['btn-link'],
        isHovered && styles['btn-link_is-hovered'],
        isPressed && styles['btn-link_is-pressed'],
        checked && styles['btn-link_is-checked']
      )}
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      onClick={onClick}
    >
      <span className={cn(styles['btn-link__text'])}>{text}</span>
    </button>
  );
};

export default BtnLink;
