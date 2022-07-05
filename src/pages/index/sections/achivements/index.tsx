import cn from 'classnames';
import Slider from './slider';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TAchivements = (props: {
  className?: string;
  modifiers: TSimpleStyleModifiers;
}) => JSX.Element;

const Achivements: TAchivements = ({ className, modifiers }) => {
  const styles = createSimpleStyle(modifiers);
  return (
    <section className={cn(styles['achivements'], className)}>
      <div className={cn(styles['achivements__col'])}>
        <h2 className={cn(styles['achivements__head-title'])}>Живой пример</h2>
        <p className={cn(styles['achivements__text'])}>
          Борис сбросил 5 кг за 2 месяца, просто заменив свой обычный корм на Cat Energy Slim.
          Отличный результат без изнуряющих тренировок! При этом он не менял своих привычек и
          по-прежнему спит по 16 часов в день.
        </p>

        <dl className={cn(styles['achivements__list-wrapper'])}>
          <div className={cn(styles['achivements__list'])}>
            <div className={cn(styles['achivements__item'])}>
              <dt className={cn(styles['achivements__title'])}>Cнижение веса</dt>
              <dd className={cn(styles['achivements__description'])}>5 кг</dd>
            </div>
            <div className={cn(styles['achivements__item'])}>
              <dt className={cn(styles['achivements__title'])}>Затрачено времени</dt>
              <dd className={cn(styles['achivements__description'])}>60 дней</dd>
            </div>
          </div>
          <div className={cn(styles['achivements__subtext'])}>
            <dt className={cn(styles['achivements__subtext-title'])}>Затраты на питание:</dt>
            <dd className={cn(styles['achivements__subtext-description'])}>15 000 РУБ.</dd>
          </div>
        </dl>
      </div>

      <Slider styles={styles} />
    </section>
  );
};

export default Achivements;
