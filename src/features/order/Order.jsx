// Test ID: IIDSAT
import { getOrder } from '../../services/apiRestaurant';
import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 py-6">
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <h2 className="font-semibold text-xl">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 text-red-50 uppercase text-sm tracking-wide px-2 py-1 rounded-full font-semibold">
              Priority
            </span>
          )}
          <span className="bg-green-500 text-green-50 uppercase text-sm tracking-wide px-2 py-1 rounded-full font-semibold">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap items-center justify-between bg-stone-200 p-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="space-y-2 divide-y divide-stone-200">
        {cart.map((item) => {
          return (
            <OrderItem
              key={item.pizzaId}
              item={item}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
            />
          );
        })}
      </ul>

      <div className=" bg-stone-200 p-5 space-y-2">
        <p className="font-medium text-sm text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-medium text-sm text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

async function loader({ params }) {
  const { orderId } = params;

  const order = await getOrder(orderId);

  return order;
}

export { loader };
export default Order;
