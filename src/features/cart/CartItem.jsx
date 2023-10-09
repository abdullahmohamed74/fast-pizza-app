import { formatCurrency } from '../../utils/helpers';
import DeleteCartItem from './DeleteCartItem';
import UpdateCartItemQuantity from './UpdateCartItemQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-5">
        <p className="font-bold text-sm">{formatCurrency(totalPrice)}</p>

        <UpdateCartItemQuantity pizzaId={pizzaId} />
        <DeleteCartItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
