import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startLoading,finishLoading } from '../features/loading/loadingSlice';
import { addLaptops, addSmartphones } from '../features/electronics/electronicsSlice';
import { addTops, addMale, addFemale } from '../features/clothing/clothingSlice';
import { addJewelries } from '../features/jewelries/jewelriesSlice';
import {
    selectSmartphones, 
    selectLaptops,
    selectLoadingState,
    selectJewelries,
    selectTops,
    selectMale,
    selectFemale
} from '../features/selectors';
import Loading from '../components/Loading/Loading';
import url from './url';
import {
    getLaptops,
    getSmartphones,
    getJewelery,
    getTops,
    getMale,
    getFemale

} from './dataFetch';
import Electronics from '../features/electronics/Electronics';
import Jewelries from '../features/jewelries/Jewelries';
import Clothing from '../features/clothing/Clothing';

const DataStore = () => {
    const saveSmartphones = useSelector(selectSmartphones);
    const saveLaptops = useSelector(selectLaptops);
    const saveJewelries = useSelector(selectJewelries);
    const saveTops = useSelector(selectTops)
    const saveMale = useSelector(selectMale)
    const saveFemale = useSelector(selectFemale)
    const isLoading = useSelector(selectLoadingState);
    const dispatch = useDispatch();
    const [laptops, setLaptops] = useState(saveLaptops);
    const [smartphones, setSmartphones] = useState(saveSmartphones);
    const [jewelries, setJewelries] = useState(saveJewelries);
    const [tops, setTops] = useState(saveTops);
    const [male, setMale] = useState(saveMale);
    const [female, setFemale] = useState(saveFemale);


    useEffect(()=>{
        dispatch(startLoading())
        setTimeout(()=>{
            getLaptops(url.laptops, dispatch, setLaptops, addLaptops);
            getSmartphones(url.smartphones, dispatch, setSmartphones, addSmartphones);
            getJewelery(url.jewelry, dispatch, setJewelries, addJewelries);
            getTops(url.tops, dispatch, setTops, addTops);
            getMale(url.male, dispatch, setMale, addMale);
            getFemale(url.female, dispatch, setFemale, addFemale);
            dispatch(finishLoading());
        }, 2000)
        
        
    }, [dispatch])


    return (
        <div>
            {isLoading && <Loading />}
            <Electronics laptops={laptops} smartphones={smartphones} />
            <Jewelries jewelries={jewelries} />
            <Clothing tops={tops} male={male} female={female} />
        </div>
    );

}

export default DataStore;