import React, { useState } from 'react';
import { PlanFormStyled } from './planFormStyled';

const placeHolder = 'Введите сумму';
const field = {
  totalSalary: 0,
  passiveIncome: 0,
  saving: 0,
  flatPrice: 0,
  flatSquareMeters: 0,
  incomePercentageToSavings: 0,
};

function PlanForm() {
  const [state, getState] = useState(field);
  const [isFieldActive, setFieldActive] = useState(false);

  return (
    <PlanFormStyled>
      <form>
        <div className="firstColumn">
          <label>
            <span>1. ЗП обоих супругов</span>
            <input
              type="text"
              name="totalSalary"
              value={state.totalSalary}
              placeholder={placeHolder}
              onChange={e =>
                getState({ ...state, totalSalary: e.target.value })
              }
            />
          </label>
          <label>
            <span>2. Пассивные доходы, мес.</span>
            <input
              type="text"
              name="passiveIncome"
              value={state.passiveIncome}
              placeholder={placeHolder}
              onChange={e =>
                getState({ ...state, passiveIncome: e.target.value })
              }
            />
          </label>
          <label>
            <span>3. Сбережения</span>
            <input
              type="text"
              name="saving"
              value={state.saving}
              placeholder={placeHolder}
              onChange={e => getState({ ...state, saving: e.target.value })}
            />
          </label>
        </div>
        <div className="secondColumn">
          <label>
            <span>4. Укажите стоимость вашей будущей квартиры</span>
            <input
              type="text"
              name="flatPrice"
              value={state.flatPrice}
              placeholder={placeHolder}
              onChange={e => getState({ ...state, flatPrice: e.target.value })}
            />
          </label>
          <label>
            <span>5. Укажите кол-во кв. м вашей будущей квартиры</span>
            <input
              type="text"
              name="flatSquareMeters"
              value={state.flatSquareMeters}
              placeholder={placeHolder}
              onChange={e =>
                getState({ ...state, flatSquareMeters: e.target.value })
              }
            />
          </label>
          <label>
            <span>6. Накопление, %</span>
            <input
              type="text"
              name="incomePercentageToSavings"
              value={state.incomePercentageToSavings}
              placeholder={placeHolder}
              onFocus={() => setFieldActive(true)}
              onBlur={() => setFieldActive(false)}
              onChange={e =>
                getState({
                  ...state,
                  incomePercentageToSavings: e.target.value,
                })
              }
            />
            <p>
              {!!isFieldActive &&
                'Укажите процент, который бы хотели накапливать в месяц от общей суммы доходов и вы увидите, когда достигните цели'}
            </p>
          </label>
        </div>
      </form>
    </PlanFormStyled>
  );
}

export default PlanForm;
