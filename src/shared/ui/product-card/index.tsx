import BtnLink from 'shared/ui/btn-link';
import cn from 'classnames';
import Image from 'next/image';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TProduct = {
  name: string;
  price: number;
  weight: number;
  flavor: string;
  img: string;
};

type TProductCard = (props: {
  className?: string;
  modifiers: TSimpleStyleModifiers;
  product: TProduct;
}) => JSX.Element;

const ProductCard: TProductCard = ({ className, modifiers, product }) => {
  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  const { price, flavor, weight, img, name } = product;
  const features = [
    { title: 'Масса', value: weight },
    { title: 'Вкус', value: flavor },
    { title: 'Цена', value: price },
  ];

  return (
    <div className={cn(className, styles['product-card'])}>
      <div className={cn(styles['product-card__inner'])}>
        <div className={cn(styles['product-card__img'])}>
          <Image src={`${img}`} alt="" layout="fill" objectFit="contain" />
        </div>
        <div className={cn(styles['product-card__details'])}>
          <h3 className={cn(styles['product-card__name'])}>{name}</h3>
          <dl className={cn(styles['product-card__features'])}>
            {features.map((el) => (
              <div className={cn(styles['product-card__feature'])} key={el.title}>
                <dt className={cn(styles['product-card__feature-title'])}>{el.title}</dt>
                <dd className={cn(styles['product-card__feature-value'])}>{el.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <BtnLink
          className={cn(styles['product-card__link'])}
          modifiers={blockModifiers['product-card__link']}
          href=""
          text="Заказать"
          type="link"
        />
      </div>
    </div>
  );
};

export default ProductCard;
