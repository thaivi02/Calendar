import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (resp: AxiosResponse) => resp.data;

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const TodoTask={
    get: () => axios.get('Task/GetTasks').then(responseBody),
    create: (task: any) => axios.post('Task/AddTask',task).then(responseBody),
}

const Priority={
    list: () => axios.get('Task/GetPriorities').then(responseBody),
}

const auth = {
    login: (user: any) => axios.post('account/login', user).then(responseBody),
    register: (user: any) => axios.post('account/signup', user).then(responseBody),
    current: () => axios.get('account/current').then(responseBody),
    logout: () => axios.post('account/logout').then(responseBody),
}

const agent ={
    TodoTask,
    Priority,
    auth
}

export default agent;