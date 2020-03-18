
export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}

// [
//     { id: 111, name: 'John', age: 29 },
//     { id: 112, name: 'Sarah', age: 25 },
//   ],

//   zmienia na 

//   {
//     111:{ id: 111, name: 'John', age: 29 },
//     112:{ id: 112, name: 'Sarah', age: 25 },
//   }



export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue); 
};

//wyciaga id z tablicy obiektow
export const getIdsArray = (array) => {
    return array.map(item =>{
        return item._id;
    });
};