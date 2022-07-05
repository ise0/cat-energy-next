import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';

import cn from 'classnames';
import { useEffect, useState } from 'react';
import createSimpleStyle from './styles/style';
import Catalog from './sections/catalog';
import ExtraCatalog from './sections/extra-catalog';
import { TProducts } from './api/fetch-products';

export { getServerSideProps } from './ssr';

const isServer = typeof window === 'undefined';

const CatalogPage = ({ products }: { products: TProducts | null }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const onWindowResize = () => setWindowWidth(window.innerWidth);
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  const { styles, blockModifiers } = createSimpleStyle({ windowWidth });

  const hideSSRStylesFlash = isServer || windowWidth === 0 ? 'visually-hidden' : '';

  return (
    <div className={cn(styles['catalog-page'], hideSSRStylesFlash)}>
      <Header
        className={cn(styles['catalog-page__header'])}
        modifiers={blockModifiers['catalog-page__header']}
      />
      <Catalog
        className={cn(styles['catalog-page__catalog'])}
        modifiers={blockModifiers['catalog-page__catalog']}
        products={products}
      />
      <ExtraCatalog
        className={cn(styles['catalog-page__extra-catalog'])}
        modifiers={blockModifiers['catalog-page__extra-catalog']}
      />
      <Partnership
        className={cn(styles['catalog-page__partnership'])}
        modifiers={blockModifiers['catalog-page__partnership']}
      />
      <div className={cn(styles['catalog-page__footer-wrapper'])}>
        <Footer
          className={cn(styles['catalog-page__footer'])}
          modifiers={blockModifiers['catalog-page__footer']}
        />
      </div>
    </div>
  );
};

export default CatalogPage;
