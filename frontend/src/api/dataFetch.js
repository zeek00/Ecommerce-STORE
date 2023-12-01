import DataManipulation from '../helpers/dataManipulation';

const dataManipulation = new DataManipulation();

const getLaptops = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url, false);
    const sortedData = dataManipulation.sortData(data, 'laptops')
    setData(sortedData);
    console.log(sortedData)
    dispatch(addData(sortedData));
}

const getSmartphones = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url, false);
    const sortedData = dataManipulation.sortData(data, 'smartphones')
    setData(sortedData);
    console.log(sortedData)
    dispatch(addData(sortedData));
}

const getJewelery = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url, false);
    const sortedData = dataManipulation.sortData(data, 'jewelery')
    console.log(sortedData)
    setData(sortedData);

    dispatch(addData(sortedData));
}

const getTops = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url, false);
    const sortedData = dataManipulation.sortData(data, 'tops')
    console.log(sortedData)

    setData(sortedData);

    dispatch(addData(sortedData));
}

const getMale = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url[0], false);
    const sortedData = dataManipulation.sortData(data, 'men shirts');
    const data2 = await dataManipulation.getData(url[1], false);
    const sortedData2 = dataManipulation.sortData(data2, 'men shoes');
    const data3 = await dataManipulation.getData(url[2], false);
    const sortedData3 = dataManipulation.sortData(data3, 'men watches');

    const toMerge = [sortedData, sortedData2, sortedData3];
    const mergedData = dataManipulation.mergeData(toMerge);

    console.log(mergedData);

    setData(mergedData);

    dispatch(addData(mergedData));
}

const getFemale = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url[0], false);
    const data2 = await dataManipulation.getData(url[1], false);
    const data3 = await dataManipulation.getData(url[2], false);
    const data4 = await dataManipulation.getData(url[3], false);
    const sortedData = dataManipulation.sortData(data, "womens-dresses");
    const sortedData2 = dataManipulation.sortData(data2, "womens-shoes");
    const sortedData3 = dataManipulation.sortData(data3, "womens-watches");
    const sortedData4 = dataManipulation.sortData(data4, "womens-bags");
    const toMerge = [sortedData,sortedData2,sortedData3,sortedData4];
    const mergedData = dataManipulation.mergeData(toMerge);

    console.log(mergedData);

    setData(mergedData);

    dispatch(addData(mergedData));    

}

export {getLaptops, getSmartphones, getJewelery, getTops, getMale, getFemale};


