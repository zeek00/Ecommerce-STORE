import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startLoading,finishLoading } from '../features/loading/loadingSlice';
import { addElectronics } from '../features/electronics/electronicsSlice';
import { addMale, addFemale } from '../features/clothing/clothingSlice';
import { addProducts } from '../features/products/productsSlice';
import {
selectElectronics,
selectMale,
selectFemale,
selectProducts
} from '../features/selectors';
import url from './url';
import {
    getElectronics,
    getMale,
    getFemale

} from './dataFetch';


const DataStore = () => {
    const saveElectronics = useSelector(selectElectronics);
    const saveProducts = useSelector(selectProducts);
    const saveMale = useSelector(selectMale)
    const saveFemale = useSelector(selectFemale)
    const dispatch = useDispatch();
    const [electronics, setElectronics] = useState(saveElectronics);
    const [male, setMale] = useState(saveMale);
    const [female, setFemale] = useState(saveFemale);
    const [, setProducts] = useState(saveProducts);



    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading());
    
            try {
                await Promise.all([
                    getElectronics(url.electronics, dispatch, setElectronics, addElectronics),
                    getMale(url.male, dispatch, setMale, addMale),
                    getFemale(url.female, dispatch, setFemale, addFemale)
                ]);
                dispatch(finishLoading());
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(finishLoading());
            }
        };
    
        fetchData();
    }, [dispatch]);
    
    useEffect(() => {
        if (male && female && electronics) {
            const updatedProducts = [...male, ...female, ...electronics];
            setProducts(updatedProducts);
            dispatch(addProducts(updatedProducts));
        }
    }, [male, female, electronics, dispatch, setProducts]);
    
    return null;

}

export default DataStore;