import { useDispatch } from 'react-redux';
import { deleteCartItem } from './cartSlice';
import Button from '../../ui/Button';

function DeleteCartItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(deleteCartItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}
export default DeleteCartItem;
