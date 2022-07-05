import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import BtnLink from 'shared/ui/btn-link';
import InputsEditor, { TInputType } from 'shared/ui/inputs-editor';
import { TBlockModifiers } from './styles';
import {
  filtersList,
  generateUIFilter,
  parseFilterToStr,
  parseFilterFromStr,
  TFilter,
} from 'pages/products/lib';
import Popup from 'shared/ui/popup';
import { fetchAvailableFilterValues } from 'pages/products/api';
import { useRouter } from 'next/router';

type TFilterBtn = (props: {
  className: string;
  filter: TFilter;
  styles: Record<string, string>;
  blockModifiers: TBlockModifiers;
}) => JSX.Element;

const FilterBtn: TFilterBtn = ({ className, filter, styles, blockModifiers }) => {
  const router = useRouter();
  const [isPopupOpened, setPopupOpened] = useState(false);
  const ref = useRef(null);

  const filters: { [k: string]: string } = {};
  filtersList.forEach((el) => {
    if (router.query[el.name]) filters[el.name] = router.query[el.name] as string;
  });

  const { data } = useQuery(
    ['availableProductFilters', filter.name, filters],
    () => fetchAvailableFilterValues(filter.name, filters),
    { enabled: isPopupOpened }
  );

  const parsedFilter = parseFilterFromStr(filter.type, filters[filter.name]);

  let { label } = filter;

  switch (parsedFilter.type) {
    case 'pickMany':
      if (parsedFilter.value.length > 0) {
        label = `${label} (${parsedFilter.value.length})`;
      }
      break;
    case 'range':
      if (parsedFilter.value.end > 0) {
        label = `${label} (${parsedFilter.value.start}-${parsedFilter.value.end})`;
      }
      break;
    default:
  }

  const setNewFilterSearchParam = (newFilter: TInputType[keyof TInputType]) => {
    setPopupOpened(false);
    const filterSearchParam: { name: string; value: string } = {
      name: filter.name,
      value: '',
    };
    switch (newFilter.type) {
      case 'pickMany':
        filterSearchParam.value = parseFilterToStr({
          type: newFilter.type,
          value: newFilter.value.filter((el) => el.active).map((el) => el.name),
        });
        break;
      default:
        filterSearchParam.value = parseFilterToStr({
          type: newFilter.type,
          value: {
            start: newFilter.value.start.value,
            end: newFilter.value.end.value,
          },
        });
        break;
    }
    if (filterSearchParam.value !== (filters[filter.name] || '')) {
      delete router.query.page;
      if (filterSearchParam.value === '') {
        delete router.query[filterSearchParam.name];
      } else {
        router.query[filterSearchParam.name] = filterSearchParam.value;
      }
    }
    router.push(router, undefined, { shallow: true });
  };

  const UIFilter = isPopupOpened && data ? generateUIFilter(parsedFilter, data) : null;
  return (
    <div className={styles[className] || ''} ref={ref}>
      <BtnLink
        checked={isPopupOpened}
        modifiers={blockModifiers['p-header__filter-btn']}
        onClick={() => setPopupOpened((currentState) => !currentState)}
        text={label}
        type="button"
      />
      {UIFilter && (
        <Popup
          hasFocus
          autoClose={() => setPopupOpened(false)}
          position={{
            type: 'anchor',
            value: {
              target: ref,
              directions: ['bottom-center', 'bottom-left', 'bottom-right'],
              relative: 'viewport',
            },
          }}
          modifiers={{ style: 'simple' }}
        >
          <InputsEditor
            title={filter.label}
            modifiers={{ style: 'simple' }}
            onChange={setNewFilterSearchParam}
            okBtnText="Посмотреть результаты"
            inputs={UIFilter}
          />
        </Popup>
      )}
    </div>
  );
};

export default FilterBtn;
