import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Cart from './features/cart/Cart';
import ProtectedRoute from './ui/ProtectedRoute';

import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'menu',
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/new',
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
        action: createOrderAction,
      },
      {
        path: 'order/:orderId',
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  const { cart } = useSelector((store) => store.cart);

  useEffect(() => {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }, [cart]);

  return <RouterProvider router={router} />;
}
export default App;
