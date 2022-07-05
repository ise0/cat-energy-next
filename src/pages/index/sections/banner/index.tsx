import BtnLink from 'shared/ui/btn-link';
import cn from 'classnames';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';
import Image from 'next/image';

type TBanner = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const Banner: TBanner = ({ className, modifiers }) => {
  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  return (
    <section className={cn(styles['banner'], className)}>
      <h2 className={cn(styles['banner__title'])}>
        Функциональное <br /> питание для котов
      </h2>
      <span className={cn(styles['banner__slogan'])}>Занялся собой? Займись котом!</span>
      <div className={cn(styles['banner__img'])}>
        <Image src="/images/index-can-desktop@2x.png" layout="fill" alt="" objectFit="contain" />
      </div>
      <BtnLink
        className={cn(styles['banner__link'])}
        href="/"
        modifiers={blockModifiers['banner__link']}
        text="Подобрать программу"
        type="link"
      />
    </section>
  );
};

export default Banner;
