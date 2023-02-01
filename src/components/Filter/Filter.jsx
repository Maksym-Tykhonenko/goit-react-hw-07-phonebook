import { useSelector, useDispatch } from 'react-redux';
import { updFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

import { Div, Input, Label } from 'components/Filter/Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(selectFilter);

  const changeFilter = event => {
    dispatch(updFilter(event.currentTarget.value));
  };

  return (
    <Div>
      <Label htmlFor="text">Find contacts by name</Label>
      <Input type="text" name="filter" value={filter} onChange={changeFilter} />
    </Div>
  );
};
