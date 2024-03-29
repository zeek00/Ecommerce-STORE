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
    const [products, setProducts] = useState(saveProducts);




    useEffect(()=>{
        dispatch(startLoading())
        const promises = [
            getElectronics(url.electronics, dispatch, setElectronics, addElectronics),
            getMale(url.male, dispatch, setMale, addMale),
            getFemale(url.female, dispatch, setFemale, addFemale)
        ];
    
        Promise.all(promises)
            .then(() => {
                dispatch(finishLoading());
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                dispatch(finishLoading());
            });
        
        
    }, [dispatch])

    useEffect(()=>{
        if(male && female && electronics){
            setProducts([...male, ...female, ...electronics])
            dispatch(addProducts(products))
        }

    }, [male, female, electronics])

    return null;

}

export default DataStore;