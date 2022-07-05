import cn from 'classnames';
import BtnLink from 'shared/ui/btn-link';
import { getStyles, TModifiers } from './styles';

type TMenu = (props: {
  title: string;
  onChange: (value: string) => void;
  modifiers: TModifiers;
  items: { label: string; active: boolean }[];
}) => JSX.Element;

const Menu: TMenu = ({ modifiers, onChange, items, title }) => {
  const { styles, blockModifiers } = getStyles(modifiers);

  return (
    <div className={cn(styles['menu'])}>
      <h2 className={styles['menu__title'] || ''}>{title}</h2>
      <ul className={styles['menu__list'] || ''}>
        {items.map((el) => (
          <li className={styles['menu__item'] || ''} key={el.label}>
            <BtnLink
              className={styles['menu__item-ctrl'] || ''}
              modifiers={blockModifiers['menu__item-ctrl']}
              text={el.label}
              checked={el.active}
              type="button"
              onClick={() => onChange(el.label)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
