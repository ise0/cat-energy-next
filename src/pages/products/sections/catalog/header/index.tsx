import cn from 'classnames';
import { useRef, useState } from 'react';
import BtnLink from 'shared/ui/btn-link';
import Menu from 'shared/ui/menu';
import { filtersList, sortList } from 'pages/products/lib';
import Popup from 'shared/ui/popup';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';
import FilterBtn from './filter-btn';
import { useRouter } from 'next/router';

type THeader = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const Header: THeader = ({ className, modifiers }) => {
  const router = useRouter();
  const [isPopupOpened, setPopupOpened] = useState(false);
  const sortRef = useRef(null);
  const sort = sortList[Number(router.query.sort) || 0];

  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  return (
    <header className={cn(className, styles['p-header'])}>
      <div className={styles['p-header__filters'] || ''}>
        {filtersList.map((filter) => (
          <FilterBtn
            className="p-header__filter-btn"
            filter={filter}
            styles={styles}
            blockModifiers={blockModifiers}
            key={filter.label}
          />
        ))}
      </div>
      <div className={styles['p-header__sort'] || ''} ref={sortRef}>
        <h3 className={styles['p-header__sort-title'] || ''}>Сортировка:</h3>
        <BtnLink
          className={styles['p-header__sort-btn'] || ''}
          text={sort.label}
          modifiers={blockModifiers['p-header__sort-btn']}
          onClick={() => setPopupOpened((prevState) => !prevState)}
          type="button"
        />
        {isPopupOpened && (
          <Popup
            hasFocus
            autoClose={() => setPopupOpened(false)}
            position={{
              type: 'anchor',
              value: {
                target: sortRef,
                directions: ['bottom-center', 'bottom-left', 'bottom-right'],
                relative: 'page',
              },
            }}
            modifiers={{ style: 'simple' }}
          >
            <Menu
              items={sortList.map((el) => ({ label: el.label, active: el === sort }))}
              modifiers={{ style: 'simple' }}
              title="Сортировка"
              onChange={(sortLabel) => {
                setPopupOpened(false);
                const newSortIndex = sortList.findIndex((el) => el.label === sortLabel);
                if (sort !== sortList[newSortIndex]) {
                  router.query.sort = newSortIndex.toString();
                  delete router.query.page;
                  router.push(router, undefined, { shallow: true });
                }
              }}
            />
          </Popup>
        )}
      </div>
    </header>
  );
};

export default Header;
