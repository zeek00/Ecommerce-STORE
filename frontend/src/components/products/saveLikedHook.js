
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddItemToUserLikesAsync } from '../../features/likes/dataThunks';

export const useSavedItems = (user) => {
  const dispatch = useDispatch();
  const [savedItems, setSavedItems] = useState([]);
  const [error, setError] = useState(null)

  const handleClick = (item) => {

    if (user) {
      setSavedItems(item);
      dispatch(AddItemToUserLikesAsync({
        id: user._id,
        items: [item]
      })
      ).then(() => {
        setError(false)
      }).catch((error) => {
        console.error('Failed to add item to user likes:', error);
      });
    }
  };

  return { handleClick, savedItems, error };
};
