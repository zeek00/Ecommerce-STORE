import {REGURL} from "../config";
 
class DataManipulation {
    async getData(url, sort){
        if(sort){
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Request failed code: " + response.status);
                }
                const data = await response.json();
                // console.log(data)
                return data;
            }
            catch(err) {
                console.log(JSON.stringify(err.message));
            }
    
        }else{
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Request failed code: " + response.status);
                }
                const data = await response.json();
                // console.log(data.products)
                return data.products;
            }
            catch(err) {
                console.log(JSON.stringify(err.message));
            }
            
        }
    };

    sortData(data, category){
        let sortedData = [];
        let id = 1;
        // console.log(data)
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
            // console.log(updatedData)

            sortedData.push(updatedData);
        }
        // console.log('this is the sorted data: '+sortedData)

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
        // console.log(mergedData)
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
                    throw new Error("Request failed code: " + response.status);
                }
                const user = await response.json();
                return user.savedItems;
            }
            catch(err) {
                console.error(`Error in getSavedItemsForUser: ${err.message}`);
                console.log(JSON.stringify(err.message));
            }
    
        }

    };
    
      
};

export default DataManipulation;
