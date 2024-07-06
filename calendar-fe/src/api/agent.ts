import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
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
    getTasksByDate: (date: string) => axios.get(`Task/GetTasksByDate`,{params:{date}}).then(responseBody),
    getTaskById: (taskId: number) => axios.get(`Task/GetTaskById/${taskId}`).then(responseBody),
    update: (taskId:number,task: any) => axios.put(`Task/UpdateTask/${taskId}`,task).then(responseBody),
    detele: (taskId: number) => axios.delete(`Task/DeleteTask/${taskId}`).then(responseBody),
}

const Priority={
    list: () => axios.get('Task/GetPriorities').then(responseBody),
}

const auth = {
    login: (user: any) => axios.post('account/login', user).then(responseBody),
    register: (user: any) => axios.post('account/signup', user).then(responseBody),
}

const agent ={
    TodoTask,
    Priority,
    auth
}

export default agent;