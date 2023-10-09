import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { store } from '../../store';
import { fetchUserAddress } from '../user/fetchUserPositionThunk';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const { cart } = useSelector((store) => store.cart);
  const {
    userName,
    position,
    address,
    isLoading: isLoadingAddress,
    error: getPositionError,
  } = useSelector((store) => store.user);
  
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalOrderPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();
  // get access to the errors that return from action function
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const handleGetPosition = (e) => {
    e.preventDefault();
    dispatch(fetchUserAddress());
  };

  return (
    <div className="py-6">
      <h2 className="font-bold mb-8 text-xl">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={userName}
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input  w-full" />
            {formErrors?.phone && (
              <p className="text-sm text-red-700 bg-red-100 mt-2 p-1 rounded-lg">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input  w-full"
            />
            {getPositionError && (
              <p className="text-sm text-red-700 bg-red-100 mt-2 p-1 rounded-lg">
                {getPositionError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[2px] z-50 md:right-[5px] md:top-[3px]">
              <Button
                onClick={handleGetPosition}
                disabled={isLoadingAddress}
                type="small"
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* to pass "cart" data to action function */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'placing order...'
              : `Order now: ${formatCurrency(totalOrderPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // the object to make post request with
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  // check if the user enter the correct details as required
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a correct phone number';
  }

  // if there is an error return the errors object
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // if there is NOT an error ==> make the request
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export { action };
export default CreateOrder;
