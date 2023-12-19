import DataManipulation from '../helpers/dataManipulation';

const dataManipulation = new DataManipulation();


const getElectronics = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url[0], false);
    const sortedData = dataManipulation.sortData(data, 'smartphones');
    const data2 = await dataManipulation.getData(url[1], false);
    const sortedData2 = dataManipulation.sortData(data2, 'laptops');

    const toMerge = [sortedData, sortedData2];
    const mergedData = dataManipulation.mergeData(toMerge);

    setData(mergedData);

    dispatch(addData(mergedData));
}

const getMale = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url[0], false);
    const sortedData = dataManipulation.sortData(data, 'shirts');
    const data2 = await dataManipulation.getData(url[1], false);
    const sortedData2 = dataManipulation.sortData(data2, 'shoes');
    const data3 = await dataManipulation.getData(url[2], false);
    const sortedData3 = dataManipulation.sortData(data3, 'watches');
    const data4 = await dataManipulation.getData(url[3], false);
    const sortedData4 = dataManipulation.sortData(data4, 'tops');

    const toMerge = [sortedData, sortedData2, sortedData3, sortedData4];
    const mergedData = dataManipulation.mergeData(toMerge);

    setData(mergedData);

    dispatch(addData(mergedData));
}

const getFemale = async (url, dispatch, setData, addData) => {
    const data = await dataManipulation.getData(url[0], false);
    const data2 = await dataManipulation.getData(url[1], false);
    const data3 = await dataManipulation.getData(url[2], false);
    const data4 = await dataManipulation.getData(url[3], false);
    const data5 = await dataManipulation.getData(url[4], false);
    const sortedData = dataManipulation.sortData(data, "dresses");
    const sortedData2 = dataManipulation.sortData(data2, "shoes");
    const sortedData3 = dataManipulation.sortData(data3, "watches");
    const sortedData4 = dataManipulation.sortData(data4, "bags");
    const sortedData5 = dataManipulation.sortData(data5, "jewelries");
    const toMerge = [sortedData,sortedData2,sortedData3,sortedData4,sortedData5];
    const mergedData = dataManipulation.mergeData(toMerge);

    setData(mergedData);

    dispatch(addData(mergedData));    

}

export {getElectronics, getMale, getFemale};


