import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { userName } = useSelector((store) => store.user);

  if (!userName) return <Navigate to="/" />;

  return children;
}
export default ProtectedRoute;
