import BtnLink from 'shared/ui/btn-link';
import cn from 'classnames';
import TextInput from 'shared/ui/text-input';
import TextArea from 'shared/ui/text-area';
import { useState } from 'react';
import CheckBtn from 'shared/ui/check-btn';
import createSimpleStyle, { TSimpleStyleModifiers } from './styles';

type TPetForm = (props: { className?: string; modifiers: TSimpleStyleModifiers }) => JSX.Element;

const purposeInputs = [
  { id: 1, label: 'Похудение' },
  { id: 2, label: 'Набор массы' },
  { id: 3, label: 'Не знаю (нужен ваш совет)' },
];
const petDataInputs = [
  { id: 1, label: 'Имя', placeholder: 'Барсик', required: true },
  { id: 2, label: 'Вес (кг)', placeholder: '7', required: true },
  { id: 3, label: 'Возраст (лет)', placeholder: '7', required: false },
];
const extraProductInputs = [
  { id: 1, label: 'Cахарозаменитель' },
  { id: 2, label: 'Питьевая вода' },
  { id: 3, label: 'Молоко' },
  { id: 4, label: 'Витамины' },
];

const PetForm: TPetForm = ({ className, modifiers }) => {
  const [goal, setGoal] = useState(1);
  const [products, setProducts] = useState<Record<number, boolean>>({});

  const { styles, blockModifiers } = createSimpleStyle(modifiers);

  return (
    <section className={cn(styles['pet-form'], className)}>
      <h2 className={cn(styles['pet-form__title'])}>Подбор Программы</h2>
      <p className={cn(styles['pet-form__text'])}>
        Заполните анкету, и мы подберем программу питания для вашего кота
      </p>
      <div className={cn(styles['pet-form__container-1'])}>
        <div className={cn(styles['pet-form__pet-data'])}>
          {petDataInputs.map((elem) => (
            <TextInput
              key={elem.id}
              className={cn(styles['pet-form__pet-data-item'])}
              label={elem.label}
              placeholder={elem.placeholder}
              modifiers={{
                ...blockModifiers.TextInputGroup,
                required: elem.required,
              }}
            />
          ))}
        </div>
        <div className={cn(styles['pet-form__goals'])}>
          {purposeInputs.map((elem) => (
            <CheckBtn
              key={elem.id}
              className={cn(styles['pet-form__goals-item'])}
              label={elem.label}
              type="radio"
              checked={goal === elem.id}
              name="goal"
              onChange={() => setGoal(elem.id)}
              modifiers={blockModifiers.goals__item}
            />
          ))}
        </div>
      </div>
      <h3 className={cn(styles['pet-form__contacts-title'])}>
        <span className={cn(styles['pet-form__contacts-title-text'])}>
          Контактные данные (владельца кота)
        </span>
      </h3>
      <div className={cn(styles['pet-form__contacts'])}>
        <TextInput
          className={cn(styles['pet-form__contacts-item'])}
          label="E-mail"
          placeholder="kuklachev@gmail.com"
          modifiers={blockModifiers.contactsMail}
        />
        <TextInput
          className={cn(styles['pet-form__contacts-item'])}
          label="Телефон"
          placeholder="8 (960) 900-60-90"
          modifiers={blockModifiers.contactsPhone}
        />
      </div>
      <h3 className={cn(styles['pet-form__comment-title'])}>
        <span className={cn(styles['pet-form__comment-title-text'])}>Комментарий</span>
      </h3>
      <TextArea
        className={cn(styles['pet-form__comment'])}
        label="Расскажите обо всех повадках кота"
        placeholder="Расскажите обо всех повадках кота"
        modifiers={blockModifiers['pet-form__comment']}
      />
      <h3 className={cn(styles['pet-form__extra-title'])}>
        <span className={cn(styles['pet-form__extra-title-text'])}>Дополнительно</span>
      </h3>
      <div className={cn(styles['pet-form__extra-products'])}>
        {extraProductInputs.map((elem) => (
          <CheckBtn
            key={elem.id}
            className={cn(styles['pet-form__extra-products-item'])}
            label={elem.label}
            name="products"
            checked={Boolean(products[elem.id])}
            onChange={() => setProducts({ ...products, ...{ [elem.id]: !products[elem.id] } })}
            modifiers={blockModifiers['pet-form__extra-products-item']}
          />
        ))}
      </div>
      <div className={cn(styles['pet-form__container-2'])}>
        <BtnLink
          className={cn(styles['pet-form__submit-btn'])}
          modifiers={blockModifiers['pet-form__submit-btn']}
          text="Отправить заявку"
          type="button"
        />

        <p className={cn(styles['pet-form__postscript'])}>* — Обязательные поля</p>
      </div>
    </section>
  );
};

export default PetForm;
