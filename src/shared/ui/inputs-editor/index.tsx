import { Dispatch, SetStateAction, useState } from 'react';
import cn from 'classnames';
import BtnLink from 'shared/ui/btn-link';
import PickManyInputs from './input-type/pickMany';
import RangeInputs from './input-type/range';
import { getStyles, TModifiers } from './styles';

export type TInputType = {
  pickMany: { type: 'pickMany'; value: Array<{ name: string; active: boolean; qty: number }> };
  range: {
    type: 'range';
    value: {
      start: { value: number; min: number };
      end: { value: number; max: number };
    };
  };
};

export type TInputParamsType = {
  pickMany: { type: 'pickMany'; value: Array<{ name: string; active: boolean; qty: number }> };
  range: {
    type: 'range';
    value: {
      start: { value: number | ''; min: number };
      end: { value: number | ''; max: number };
    };
  };
};

type TInputsEditor = <T extends keyof TInputType>(props: {
  title: string;
  onChange: (value: TInputType[T]) => void;
  modifiers: TModifiers;
  okBtnText?: string;
  inputs: TInputType[T];
}) => JSX.Element;

const resetInputs = <T extends keyof TInputType>(
  inputs: TInputParamsType[T]
): TInputParamsType[T] => {
  switch (inputs.type) {
    case 'pickMany':
      return {
        type: inputs.type,
        value: inputs.value.map((el) => ({ ...el, active: false })),
      } as TInputParamsType[T];
    default:
      return {
        type: inputs.type,
        value: {
          start: { ...inputs.value.start, value: '' },
          end: { ...inputs.value.end, value: '' },
        },
      } as TInputParamsType[T];
  }
};

const prepareInputsForReturn = <T extends keyof TInputType>(
  inputs: TInputParamsType[T]
): TInputType[T] => {
  switch (inputs.type) {
    case 'pickMany':
      return inputs as TInputType[T];
    default: {
      return {
        type: inputs.type,
        value: {
          start: { ...inputs.value.start, value: +inputs.value.start.value },
          end: { ...inputs.value.end, value: +inputs.value.end.value },
        },
      } as TInputType[T];
    }
  }
};

const prepareInputsForParams = <T extends keyof TInputType>(
  inputs: TInputType[T]
): TInputParamsType[T] => {
  switch (inputs.type) {
    case 'pickMany':
      return inputs;
    default: {
      return {
        type: inputs.type,
        value: {
          start: { ...inputs.value.start, value: inputs.value.start.value || '' },
          end: { ...inputs.value.end, value: inputs.value.end.value || '' },
        },
      } as TInputParamsType[T];
    }
  }
};

const InputsEditor: TInputsEditor = ({ modifiers, onChange, okBtnText = 'ok', inputs, title }) => {
  const [inputsValue, setInputsValue] = useState(prepareInputsForParams(inputs));

  const { styles, blockModifiers } = getStyles(modifiers);

  return (
    <form
      className={cn(styles['inputs-editor'], styles[`inputs-editor_type_${inputs.type}`])}
      onSubmit={(evt) => evt.preventDefault()}
    >
      <h2 className={styles['inputs-editor__title']}>{title}</h2>
      <div className={styles['inputs-editor__inputs']}>
        {inputsValue.type === 'pickMany' ? (
          <PickManyInputs
            blockModifiers={blockModifiers}
            styles={styles}
            inputs={inputsValue}
            setInputs={setInputsValue as Dispatch<SetStateAction<TInputParamsType['pickMany']>>}
          />
        ) : (
          <RangeInputs
            blockModifiers={blockModifiers}
            styles={styles}
            inputs={inputsValue}
            setInputs={setInputsValue as Dispatch<SetStateAction<TInputParamsType['range']>>}
          />
        )}
      </div>
      <div>
        <BtnLink
          className={styles['inputs-editor__reset']}
          modifiers={blockModifiers['inputs-editor__reset']}
          onClick={() => setInputsValue(resetInputs)}
          text="сбросить"
          type="reset"
        />
      </div>
      <BtnLink
        className={styles['inputs-editor__confirm']}
        modifiers={blockModifiers['inputs-editor__confirm']}
        onClick={() => onChange(prepareInputsForReturn(inputsValue))}
        text={okBtnText}
        type="submit"
      />
    </form>
  );
};

export default InputsEditor;
