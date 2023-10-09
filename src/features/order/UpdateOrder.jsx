import { useFetcher } from 'react-router-dom';
import Button from './../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state === 'loading';
  
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">{isLoading ? 'updating...' : 'make priority'}</Button>
    </fetcher.Form>
  );
}

async function action({ request, params }) {
  // in this case we will not need "request" because we don NOT have inputs in the form
  const data = { priority: true };
  const { orderId } = params;

  await updateOrder(orderId, data);

  return null;
}

export { action };
export default UpdateOrder;
