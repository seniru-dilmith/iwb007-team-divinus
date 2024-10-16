import useAuth  from './useAuth';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import axiosInstance from '../api/axios';


const useAxios = () => {

    const {accessToken} = useAuth();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        axiosInstance.interceptors.request.use(
            (config) => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

    },[accessToken]);


    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
                (error) => {
                    const originalRequest = error.config;
                    if (error.response.status === 403 && !originalRequest._retry) {
                        originalRequest._retry = true;

                        originalRequest.headers['Authorization'] = `Bearer ${refreshToken()}`;

                        return axiosInstance(originalRequest);
                    }

                return Promise.reject(error);
            }
        );
    },[accessToken, refreshToken]);
    
    
    
    return axiosInstance;
}


export default useAxios;