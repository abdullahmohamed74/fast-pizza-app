import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateCartItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  const curentItemQuantity = useSelector(
    (store) =>
      store.cart.cart.find((item) => item.pizzaId === pizzaId).quantity,
  );

  return (
    <div className="space-x-2">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span>{curentItemQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}
export default UpdateCartItemQuantity;
