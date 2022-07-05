import cn from 'classnames';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TPartnership = (props: {
  className?: string;
  modifiers: TSimpleStyleModifiers;
}) => JSX.Element;

const Partnership: TPartnership = ({ className, modifiers }) => {
  const styles = createSimpleStyle(modifiers);

  return (
    <section className={cn(styles['partnership'], className)}>
      <div className={cn(styles['partnership__card'])}>
        <h2 className={cn(styles['partnership__title'])}>
          Приглашаем <br /> к сотрудничеству <br /> дилеров!
        </h2>
        <p className={cn(styles['partnership__address'])}>
          ул. Большая Конюшенная, д. 19/8 <br className={cn(styles['partnership__address-sep'])} />
          <br className={cn(styles['partnership__address-sep'])} />
          Санкт-Петербург
        </p>
      </div>
      <iframe
        className={cn(styles['partnership__map'])}
        title="address"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d499.65094354388316!2d30.322498829276046!3d59.938716698867246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x579d04ceacde2160!2zNTnCsDU2JzE5LjQiTiAzMMKwMTknMjMuMCJF!5e0!3m2!1sru!2sru!4v1643407721078!5m2!1sru!2sru"
        style={{ border: 0 }}
        loading="lazy"
      />
    </section>
  );
};

export default Partnership;
