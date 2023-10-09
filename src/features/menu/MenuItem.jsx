import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Button from './../../ui/Button';
import { addCartItem } from '../cart/cartSlice';
import { useSelector } from 'react-redux';
import DeleteCartItem from '../cart/DeleteCartItem';
import UpdateCartItemQuantity from '../cart/UpdateCartItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // check if the item exists or not in the cart
  const isCartItemExist = useSelector((store) =>
    store.cart.cart.some((item) => item.pizzaId === id),
  );

  // add a new item to the cart
  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addCartItem(newItem));
  };

  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-3 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? 'grayscale opacity-70' : ''}`}
      />
      <div className="flex flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <>
              <p className="text-sm">{formatCurrency(unitPrice)}</p>

              {isCartItemExist ? (
                <div className="flex items-center gap-2 md:gap-4">
                  <UpdateCartItemQuantity pizzaId={id} />
                  <DeleteCartItem pizzaId={id} />
                </div>
              ) : (
                <Button onClick={handleAddToCart} type="small">
                  Add to cart
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
