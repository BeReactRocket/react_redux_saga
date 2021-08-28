import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Count from '../components/Count';
import { decreaseAsync, increaseAsync } from '../redux/modules/counter';

const CountContainer = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => {
    dispatch(increaseAsync());
  }, [dispatch]);
  const onDecrease = useCallback(() => {
    dispatch(decreaseAsync());
  }, [dispatch]);
  return (
    <Count count={count} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CountContainer;
