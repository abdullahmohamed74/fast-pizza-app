import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

function Cart() {
  const dispatch = useDispatch();
  const { userName, cart } = useSelector((store) => {
    return {
      userName: store.user.userName,
      cart: store.cart.cart,
    };
  });

  // if there are NO items in the cart
  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 mb-1 font-extrabold text-xl">
        Your cart, {userName}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          return <CartItem key={item.pizzaId} item={item} />;
        })}
      </ul>

      <div className="mt-6 space-x-2 flex items-center justify-between">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clearCart())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
