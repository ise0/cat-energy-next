import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { usePressState } from 'shared/lib/hooks';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

import iconVk from '@public/images/icon-vk.svg';
import iconInst from '@public/images/icon-insta.svg';
import iconFb from '@public/images/icon-fb.svg';

type TFooter = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const socials = [
  { img: iconVk, alt: 'vk' },
  { img: iconInst, alt: 'instagram' },
  { img: iconFb, alt: 'facebook' },
];

const SocialsItem = ({
  social,
  styles,
}: {
  social: typeof socials[number];
  styles: Record<string, string>;
}) => {
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isPressed = usePressState(imgRef, 'Enter');

  const { alt, img } = social;
  return (
    <li
      className={cn(
        styles['footer__socials-item'],
        isHovered && styles['footer__socials-item_is-hovered'],
        isPressed && styles['footer__socials-item_is-pressed']
      )}
    >
      <Link href="/">
        <a
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={imgRef}
        >
          <Image src={img} alt={alt} />
        </a>
      </Link>
    </li>
  );
};

const Footer: TFooter = ({ className, modifiers }) => {
  const logoRef = useRef(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const isLogoPressed = usePressState(logoRef, 'Enter');

  const styles = createSimpleStyle(modifiers);

  return (
    <div className={cn(styles['footer'], className)}>
      <Link href="/">
        <a
          className={cn(
            styles['footer__logo-wrapper'],
            styles['footer__logo'],
            isLogoHovered && styles['footer__logo_is-hovered'],
            isLogoPressed && styles['footer__logo_is-pressed']
          )}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <Image
            className={styles['footer__logo-inner']}
            src="/images/logo-footer.svg"
            alt="logo"
            width="128"
            height="24"
          />
        </a>
      </Link>
      <ul className={cn(styles['footer__socials-list'])}>
        {socials.map((elem) => (
          <SocialsItem social={elem} styles={styles} key={elem.alt} />
        ))}
      </ul>
      <div className={cn(styles['footer__academy'])}>
        <span className={cn(styles['footer__academy-title'])}>???? ???????</span>
        <Image
          className={cn(styles['footer__academy-logo'])}
          src="/images/icon-vk.svg"
          alt=""
          width="27"
          height="34"
        />
      </div>
    </div>
  );
};

export default Footer;
