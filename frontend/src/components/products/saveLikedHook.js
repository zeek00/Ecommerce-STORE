import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { savedItemsAsync } from '../../features/session/sessionSlice';

export const useSavedItems = (user) => {
console.log(user)
const dispatch = useDispatch()
const [savedItems, setSavedItems] = useState([])
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user && savedItems) {
        console.log(savedItems)
        dispatch(savedItemsAsync(savedItems));
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [user, savedItems, dispatch]);

  const handleClick = (item) => {
    const itemAlreadySaved = savedItems.find(savedItem => savedItem.id === item.id);

    if (!itemAlreadySaved && user) {
      const updatedSavedItems = [...savedItems, item];
      if (!updatedSavedItems.token && !updatedSavedItems.id) {
        updatedSavedItems.token = user.token;
        updatedSavedItems.id = user._id;
      }
      setSavedItems(updatedSavedItems);
      console.log(updatedSavedItems);
    }
  };

  return { handleClick };
};