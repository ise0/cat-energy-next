import { useRef, useState } from 'react';
import cn from 'classnames';
import { usePressState } from 'shared/lib/hooks';
import Image from 'next/image';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';
import ActiveLink from 'shared/lib/active-link';
import Link from 'next/link';

import logoMobile from '@public/images/logo-mobile.svg';
import logoTablet from '@public/images/logo-tablet.svg';
import logoDesktop from '@public/images/logo-desktop.svg';

type TMainNav = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const logo = {
  s: logoMobile,
  m: logoTablet,
  l: logoDesktop,
};

const navList = [
  { title: 'Главная', href: '/' },
  { title: 'Каталог продукции', href: '/products' },
  { title: 'Подбор программы', href: '/pet-form' },
];

const NavItem = ({
  title,
  href,
  styles,
}: {
  title: string;
  href: string;
  styles: Record<string, string>;
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isPressed = usePressState(ref, 'Enter');

  return (
    <ActiveLink href={href} activeClassName={styles['header__nav-item_is-active']}>
      <a
        className={cn(
          styles['header__nav-item'],
          isHovered && styles['header__nav-item_is-hovered'],
          isPressed && styles['header__nav-item_is-pressed']
        )}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={cn(styles['header__nav-text'])}>{title}</span>
      </a>
    </ActiveLink>
  );
};

const MainNav: TMainNav = ({ className, modifiers }) => {
  const ref = useRef(null);
  const [navIsVisible, changeNavVisibleState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isPressed = usePressState(ref, 'Enter');

  const { styles, extraModifiers } = createSimpleStyle(modifiers, { navIsVisible });

  const onMenuBtnClick = () => changeNavVisibleState(!navIsVisible);

  return (
    <div className={cn(styles['header'], className)}>
      <div className={cn(styles['header__container'])}>
        <Link href="/">
          <a
            className={cn(
              styles['header__logo'],
              isHovered && styles['header__logo_is-hovered'],
              isPressed && styles['header__logo_is-pressed']
            )}
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              className={cn(styles['header__logo-inner'])}
              src={logo[extraModifiers.logoSize]}
              alt="logo"
            />
          </a>
        </Link>

        <button className={cn(styles['header__btn'])} type="button" onClick={onMenuBtnClick}>
          Menu
        </button>
      </div>
      <nav className={cn(styles['header__nav-list'])}>
        {navList.map(({ title, href }) => (
          <NavItem title={title} href={href} styles={styles} key={title} />
        ))}
      </nav>
    </div>
  );
};

export default MainNav;
