/** Absolute imports */
import axios from "axios";

/** Const */
import { baseUrl_Http } from "./baseURL";


export const api = axios.create({
    baseURL: baseUrl_Http,
    headers:  {
        'Authorization': `Bearer ${localStorage.getItem('userData_Messanger') ? JSON.parse(localStorage.getItem('userData_Messanger')??"{}").token : '{}'}`
    }
});