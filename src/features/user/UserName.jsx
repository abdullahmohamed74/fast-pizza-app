import { useDispatch, useSelector } from 'react-redux';
import { logout } from './userSlice';

function UserName() {
  const dispatch = useDispatch();
  const { userName } = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!userName) return null;

  return (
    <div className="text-sm font-semibold flex items-center gap-4">
      <p className="hidden sm:block">{`wlcome ${userName}`}</p>
      <button
        onClick={handleLogout}
        className="inline-block uppercase bg-yellow-100 px-3 py-1.5 rounded-full"
      >
        logout
      </button>
    </div>
  );
}
export default UserName;
