import { Dispatch, SetStateAction } from 'react';
import TextInput from 'shared/ui/text-input';
import type { TInputParamsType } from '..';
import type { TBlockModifiers } from '../styles';

type TRangeInputs = (props: {
  styles: Record<string, string>;
  blockModifiers: TBlockModifiers;
  inputs: TInputParamsType['range'];
  setInputs: Dispatch<SetStateAction<TInputParamsType['range']>>;
}) => JSX.Element;

const RangeInputs: TRangeInputs = ({
  styles,
  blockModifiers,
  inputs: {
    value: { start, end },
  },
  setInputs,
}) => (
  <div className={styles['inputs-editor__range'] || ''}>
    <TextInput
      className={styles['inputs-editor__range-item'] || ''}
      placeholder={start.min.toString()}
      modifiers={blockModifiers['inputs-editor__range-item']}
      value={start.value}
      name="range-start"
      onChange={(value) => {
        if (!Number.isNaN(+value)) {
          const newValue = value === '' ? ('' as const) : +value;
          setInputs((prevState) => {
            const newStartValue = { ...prevState.value.start, value: newValue };
            return { ...prevState, value: { ...prevState.value, start: newStartValue } };
          });
        }
      }}
    />
    <div className={styles['inputs-editor__range-sep']} />
    <TextInput
      className={styles['inputs-editor__range-item'] || ''}
      placeholder={end.max.toString()}
      modifiers={blockModifiers['inputs-editor__range-item']}
      value={end.value}
      name="range-end"
      onChange={(value) => {
        if (!Number.isNaN(+value)) {
          const newValue = value === '' ? ('' as const) : +value;
          setInputs((prevState) => {
            const newEndValue = { ...prevState.value.end, value: newValue };
            return { ...prevState, value: { ...prevState.value, end: newEndValue } };
          });
        }
      }}
    />
  </div>
);

export default RangeInputs;
