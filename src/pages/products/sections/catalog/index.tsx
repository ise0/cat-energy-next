import BtnLink from 'shared/ui/btn-link';
import cn from 'classnames';
import ProductCard from 'shared/ui/product-card';
import Header from './header';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';
import Spin from 'shared/ui/spin';
import { getPagesToDisplay, MAX_PAGE_ELEMS } from 'pages/products/lib';
import { fetchProducts } from 'pages/products/api';
import { useRouter } from 'next/router';
import { TProducts } from 'pages/products/api/fetch-products';

type TCatalog = (props: {
  className?: string;
  modifiers: TSimpleStyleModifiers;
  products: TProducts | null;
}) => JSX.Element;

const Catalog: TCatalog = ({ className, modifiers }) => {
  const router = useRouter();
  const searchParamPage = Number(router.query.page) || 1;

  const { isLoading, isError, isSuccess, data } = useQuery(
    ['products-catalog', router.query],
    async () => fetchProducts(router.query),
    { keepPreviousData: true }
  );

  const [currentPage, setCurrentPage] = useState(searchParamPage);
  const [currentPageStale, setCurrentPageStale] = useState(false);

  useEffect(() => setCurrentPageStale(true), [data]);

  useEffect(() => {
    if (!currentPageStale) return;
    setCurrentPageStale(false);
    setCurrentPage(searchParamPage);
    if (searchParamPage <= 1) {
      delete router.query.page;
      router.replace(router, undefined, { shallow: true });
    }
  }, [currentPageStale, currentPage, searchParamPage, router]);

  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  let body;

  if (isSuccess) {
    const { totalQty, items: productsList } = data as Exclude<typeof data, null>;
    const pagesToDisplay = getPagesToDisplay(totalQty, currentPage);
    const setNewPage = (page: number) => {
      const numPages = Math.ceil(totalQty / MAX_PAGE_ELEMS) || 1;
      let newPage = page;
      if (page > numPages) newPage = numPages;
      if (page < 1) newPage = 1;
      if (newPage !== currentPage) {
        router.query.page = newPage.toString();
        router.push(router, undefined, { shallow: true });
      }
    };

    body = (
      <>
        <ul className={cn(styles['catalog__products'])}>
          {productsList.map((product) => (
            <li className={cn(styles['catalog__product'])} key={product._id}>
              <ProductCard
                className={cn(styles['catalog__product-card'])}
                product={product}
                modifiers={blockModifiers['product__card']}
              />
            </li>
          ))}
        </ul>
        <div className={styles['catalog__pages']}>
          <BtnLink
            className={styles['catalog__pages-prev']}
            text="Пред"
            type="button"
            modifiers={blockModifiers['catalog__pages-prev']}
            onClick={() => setNewPage(currentPage - 1)}
          />
          <ol className={styles['catalog__pages-list']}>
            {pagesToDisplay.map((el) => (
              <li
                className={cn(
                  styles['catalog__pages-item'],
                  currentPage !== el || styles['catalog__pages-item_active']
                )}
                key={el}
              >
                <button
                  className={styles['catalog__pages-item-ctrl']}
                  onClick={() => setNewPage(el)}
                  type="button"
                >
                  {el}
                </button>
              </li>
            ))}
          </ol>
          <BtnLink
            className={styles['catalog__pages-next']}
            text="След"
            type="button"
            modifiers={blockModifiers['catalog__pages-prev']}
            onClick={() => setNewPage(currentPage + 1)}
          />
        </div>
      </>
    );
  }

  if (isLoading) {
    body = (
      <div className={styles['catalog__spin']}>
        <Spin
          className={styles['catalog__spin-inner']}
          modifiers={blockModifiers['catalog__spin-inner']}
        />
      </div>
    );
  }

  if (isError) body = <span>Oops something went wrong</span>;

  return (
    <section className={cn(styles['catalog'], className)}>
      <h2 className={cn(styles['catalog__title'])}>Каталог продукции</h2>
      <Header modifiers={{ style: 'simple' }} />
      {body}
    </section>
  );
};

export default Catalog;
