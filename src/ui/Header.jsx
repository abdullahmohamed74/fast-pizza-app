import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="bg-yellow-400 md:uppercase px-4 py-3 sm:px-6 border-b border-stone-200 flex items-center justify-between">
      <Link to="/" className="tracking-wider  md:tracking-widest">
        FAST REACT PIZZA CO.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
export default Header;
