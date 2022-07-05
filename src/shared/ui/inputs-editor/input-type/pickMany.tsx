import { Dispatch, SetStateAction } from 'react';
import CheckBtn from 'shared/ui/check-btn';
import type { TInputParamsType, TInputType } from '..';
import type { TBlockModifiers } from '../styles';

type TPickManyInputs = (props: {
  styles: Record<string, string>;
  blockModifiers: TBlockModifiers;
  inputs: TInputType['pickMany'];
  setInputs: Dispatch<SetStateAction<TInputParamsType['pickMany']>>;
}) => JSX.Element;

const PickManyInputs: TPickManyInputs = ({ styles, blockModifiers, inputs, setInputs }) => (
  <ul className={styles['inputs-editor__pick-many'] || ''}>
    {inputs.value.map((el, i) => (
      <li className={styles['inputs-editor__pick-many-item'] || ''} key={el.name}>
        <CheckBtn
          className={styles['inputs-editor__pick-many-chkbox'] || ''}
          modifiers={blockModifiers['inputs-editor__pick-many-chkbox']}
          checked={el.active}
          label={el.qty ? `${el.name} (${el.qty})` : el.name}
          onChange={() => {
            const newInputsValue = [...inputs.value];
            newInputsValue[i] = { ...el, active: !el.active };
            setInputs({...inputs, value:newInputsValue});
          }}
        />
      </li>
    ))}
  </ul>
);

export default PickManyInputs;
