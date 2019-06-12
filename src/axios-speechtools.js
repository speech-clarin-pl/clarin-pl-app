 import axios from 'axios';

 const instance = axios.create({
     baseURL:'https:/localhost/',
 });

 export default instance;
