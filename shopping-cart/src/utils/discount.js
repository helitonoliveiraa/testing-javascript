import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = ({
  amount,
  item: { condition, quantity },
}) => {
  if (condition?.percentage && quantity > condition.minimum) {
    return amount.percentage(condition.percentage);
  }
  return Money({ amount: 0 });
};

const calculateQuantityDiscount = ({
  amount,
  item: { condition, quantity },
}) => {
  debugger;
  const isEven = quantity % 2 === 0;
  if (condition?.quantity && quantity > condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({ amount: 0 });
};

export const calculateDiscount = ({ amount, quantity, condition }) => {
  const conditions = Array.isArray(condition) ? condition : [condition];

  const [HigherDiscount] = conditions
    .map(cond => {
      if (cond.percentage) {
        return calculatePercentageDiscount({
          amount,
          item: { condition: cond, quantity },
        }).getAmount();
      }

      if (cond.quantity) {
        return calculateQuantityDiscount({
          amount,
          item: { condition: cond, quantity },
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: HigherDiscount });
};
