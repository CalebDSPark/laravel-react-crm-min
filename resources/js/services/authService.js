import jwtDecode from 'jwt-decode';
import axios from '../utils/axios';

class AuthService {
  
    login = (username, password) => new Promise((resolve, reject) => {
        axios.post('/api/auth/login', { username, password })
        .then((response) => {        
            if (response.data) {                                
                this.setSession(response.data.access_token);                     
                resolve(response.data.user);
            } else {            
                reject(response.data.error);
            }
        })
        .catch((error) => {
            reject(error);
        });
    })
    
    logout = () => {
        this.setSession(null);
    }

    setSession = (access_token) => {
        if (access_token) {
            localStorage.setItem('access_token ', access_token );
            axios.defaults.headers.common.Authorization = `Bearer ${access_token }`;
        } else {
            localStorage.removeItem('access_token ');
            delete axios.defaults.headers.common.Authorization;
        }
    }

    getAccessToken  = () => localStorage.getItem('access_token ');

    isValidToken = (access_token) => {        
        if (!access_token ) {
            console.log('no access_token !!')
            return false;
        }

        const decoded = jwtDecode(access_token );
        const currentTime = Date.now() / 1000;

        console.log('exp: ' + decoded.exp);
        console.log('now: ' + currentTime);

        return decoded.exp > currentTime;
    }

    // isAuthenticated = () => !!this.getAccessToken()
    isAuthenticated = () => this.isValidToken(this.getAccessToken());

    setTokenToHeader() {
        const access_token = this.getAccessToken();
        if(access_token) {
            axios.defaults.headers.common.Authorization = `Bearer ${access_token }`;
        }
    }   
}

const authService = new AuthService();

export default authService;
