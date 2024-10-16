import { axiosWithCredential } from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refreshToken = () => {
        let accessToken;

        axiosWithCredential.post('/admin/refreshToken')
            .then((res) => {
                accessToken = res.data.accessToken;
                setAccessToken(res.data.accessToken);
            })
            .catch((err) => {
                console.log(err);
                setAccessToken(null);
            })
        
        return accessToken;
    }
    return refreshToken;
}

export default useRefreshToken;