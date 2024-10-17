import { axiosWithCredential } from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAccessToken, setIsAuthenticated } = useAuth();

    const refreshToken = () => {
        let accessToken;

        axiosWithCredential.post('/admin/refreshToken')
            .then((res) => {
                setAccessToken(res.data.accessToken);
                accessToken = res.data.accessToken;
                setIsAuthenticated(true);
            })
            .catch((err) => {
                console.log(err);
                setAccessToken(null);
                setIsAuthenticated(false);
            })
        
        return accessToken;
    }
    return refreshToken;
}

export default useRefreshToken;