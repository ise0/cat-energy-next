import cn from 'classnames';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TFeatures = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const features = [
  {
    text: `Функциональное питание содержит только полезные питательные вещества.`,
    modifier: 'features__item_icon_leaf',
  },
  {
    text: `Выпускается в виде порошка, который нужно лишь залить кипятком и готово.`,
    modifier: 'features__item_icon_tub',
  },
  {
    text: `Замените один-два приема обычной еды на наше функциональное питание.`,
    modifier: 'features__item_icon_eat',
  },
  {
    text: `Уже через месяц наслаждайтесь изменениями к лучшему вашего питомца!`,
    modifier: 'features__item_icon_alarm',
  },
];

const Features: TFeatures = ({ className, modifiers }) => {
  const styles = createSimpleStyle(modifiers);

  return (
    <section className={cn(styles['features'], className)}>
      <h2 className={cn(styles['features__title'])}>Как это работает</h2>
      <ul className={cn(styles['features__list'])}>
        {features.map(({ modifier, text }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={cn(styles['features__item'], styles[modifier])} key={index}>
            <p className={cn(styles['features__text'])}>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
