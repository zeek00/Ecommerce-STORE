import {REGURL} from "./config";
 
class DataManipulation {
    async getData(url, sort){
        if(sort){
            try{
                const response = await fetch(url);
                if(!response.ok){
                    const error = new Error();
                    error.message = 'Request Failed';
                    error.code = 404;
                    throw error;                 
                }
                const data = await response.json();
                return data;
            }
            catch(error) {
                console.error(error.message);
            }
    
        }else{
            try{
                const response = await fetch(url);
                if(!response.ok){
                    const error = new Error();
                    error.message = 'Request Failed';
                    error.code = 404;
                    throw error;     
                }
                const data = await response.json();
                return data.products;
            }
            catch(error) {
                console.error(error.message);
            }
            
        }
    };

    sortData(data, category){
        let sortedData = [];
        let id = 1;
        for (let obj of data) {
            let updatedData = {
                id: id++,
                category: category,
                title: obj.title || '',
                price: obj.price || 0,
                description: obj.description || '',
                images: []
            };

            if (Array.isArray(obj.images)) {
                this.sortImages(obj.images, updatedData.images);
            } else if (typeof obj.image === 'string') {
                updatedData.images.push(obj.image);
            }

            sortedData.push(updatedData);
        }

        return sortedData;
    };

    sortImages(imageArray, targetArray){
        for (let image of imageArray) {
            targetArray.push(image);
        }
    };

    mergeData(dataArray){
        let id = 1;
        const mergedData = [].concat(...dataArray)
        for (let obj of mergedData) {
            obj.id = id++
        }
        return mergedData;
    
    };
    async getSavedItemsForUser (id, token){
        if(id){
            try{
                const headers = new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': token,
                });
                
              
                const response = await fetch(`${REGURL}/users/${id}`, {
                    method: 'GET',
                    headers: headers,
                });

                if(!response.ok){
                    const error = new Error();
                    error.message = 'jwt expired';
                    error.code = 404;
                    throw error;                     
                }
                const user = await response.json();
                return user.savedItems;
            }
            catch(err) {
                console.error(`Error in getSavedItemsForUser: ${err.message}`);
            }
    
        }

    };
    
      
};

export default DataManipulation;
