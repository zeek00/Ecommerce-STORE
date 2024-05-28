import DataManipulation from '../helpers/dataManipulation';

const dataManipulation = new DataManipulation();

const fetchDataAndSort = async (categories, urls) => {
    return Promise.all(urls.map(async (url, index) => {
        const data = await dataManipulation.getData(url, false);
        return { category: categories[index], data: dataManipulation.sortData(data, categories[index]) };
    }));
};

const mergeDataAndDispatch = (sortedData, dispatch, setData, addData) => {
    const mergedData = dataManipulation.mergeData(sortedData.map(item => item.data));
    setData(mergedData);
    dispatch(addData(mergedData));
};

const getDataAndDispatch = async (categories, urls, dispatch, setData, addData) => {
    try {
        const sortedData = await fetchDataAndSort(categories, urls);
        mergeDataAndDispatch(sortedData, dispatch, setData, addData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getElectronics = async (urls, dispatch, setData, addData) => {
    await getDataAndDispatch(['smartphones', 'laptops'], urls, dispatch, setData, addData);
};

const getMale = async (urls, dispatch, setData, addData) => {
    await getDataAndDispatch(['shirts', 'shoes', 'watches', 'tops'], urls, dispatch, setData, addData);
};

const getFemale = async (urls, dispatch, setData, addData) => {
    await getDataAndDispatch(['dresses', 'shoes', 'watches', 'bags', 'jewelries'], urls, dispatch, setData, addData);
};

export { getElectronics, getMale, getFemale };
