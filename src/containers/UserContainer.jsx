import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { getUsersPending } from '../redux/modules/users';

const UserContainer = () => {
  const { loading, users, error } = useSelector((state) => state.users);
  // const {} = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const getUsersSagaStart = useCallback(() => {
    dispatch(getUsersPending());
  }, [dispatch]);
  useEffect(() => {
    getUsersSagaStart();
  }, [getUsersSagaStart]);
  return <User loading={loading} users={users} error={error} />;
};

export default UserContainer;
