import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savedItemsAsync } from '../../features/session/dataThunks';

export const useSavedItems = (user) => {
const dispatch = useDispatch()
const [savedItems, setSavedItems] = useState([])
console.log(user)

const handleClick = (item) => {
  const itemAlreadySaved = savedItems.find(savedItem => savedItem.id === item.id);

  if (!itemAlreadySaved && user) {
    const updatedSavedItems = [...savedItems, item];
    if (!updatedSavedItems.id) {
      updatedSavedItems.id = user._id;
    }
    setSavedItems(updatedSavedItems);
    console.log(savedItems)
    dispatch(savedItemsAsync(savedItems));
  }
};

  return { handleClick };
};