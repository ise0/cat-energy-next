import cn from 'classnames';
import BtnLink from 'shared/ui/btn-link';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TObjectives = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const objectives = [
  {
    title: 'Похудение',
    text: `Ваш кот весит больше собаки и почти утратил способность лазить по
    деревьям? Пора на диету! Cat Energy Slim поможет вашему питомцу
    сбросить лишний вес.`,
    linkTitle: 'Каталог slim',
    link: '/',
    modifier: 'objectives__item_icon_slim',
  },
  {
    title: 'Набор массы',
    text: `Заработать авторитет среди дворовых котов и даже собак? Серия Cat
    Energy Pro поможет вашему коту нарастить необходимые мышцы!`,
    linkTitle: 'Каталог pro',
    link: '/',
    modifier: 'objectives__item_icon_pro',
  },
];

const Objectives: TObjectives = ({ className, modifiers }) => {
  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  return (
    <section className={cn(styles['objectives'], className)}>
      <h2 className="visually-hidden">Ваша цель</h2>
      <ul className={cn(styles['objectives__list'])}>
        {objectives.map((item) => (
          <li className={cn(styles['objectives__item'], styles[item.modifier])} key={item.title}>
            <h3 className={cn(styles['objectives__title'])}>{item.title}</h3>
            <p className={cn(styles['objectives__text'])}>{item.text}</p>
            <div className={cn(styles['objectives__link-wrapper'])}>
              <BtnLink
                className={cn(styles['objectives__link'])}
                type="link"
                href={item.link}
                modifiers={blockModifiers['objectives__link']}
                text={item.linkTitle}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Objectives;
