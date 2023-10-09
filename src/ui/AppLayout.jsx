import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';
import { useSelector } from 'react-redux';

function AppLayout() {
  const { userName } = useSelector((store) => store.user);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <main className="overflow-auto">
        <div className="w-11/12 max-w-3xl mx-auto">
          <Outlet />
        </div>
      </main>

      {userName !== '' && <CartOverview />}
    </div>
  );
}
export default AppLayout;
