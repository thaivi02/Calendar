import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

const responseBody = (resp: AxiosResponse) => resp.data;

axios.interceptors.request.use(
    config => {
        deleteExpiredToken();
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

const deleteExpiredToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const { exp } = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = new Date(exp * 1000);
            if (expirationTime < new Date()) {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
            }
        } catch (error) {
            // Handle any errors in parsing the token
            console.error("Error deleting expired token:", error);
        }
    }
};

const TodoTask={
    get: () => axios.get('odata/Task/GetTasks').then(responseBody),
    create: (task: any) => axios.post('odata/Task/AddTask',task).then(responseBody),
    getTasksByDate: (date: string) => axios.get(`odata/Task/GetTasksByDate`,{params:{date}}).then(responseBody),
    getTaskById: (taskId: number) => axios.get(`odata/Task/GetTaskById/${taskId}`).then(responseBody),
    update: (taskId:number,task: any) => axios.put(`odata/Task/UpdateTask/${taskId}`,task).then(responseBody),
    detele: (taskId: number) => axios.delete(`odata/Task/DeleteTask/${taskId}`).then(responseBody),
}

const Priority={
    list: () => axios.get('odata/Task/GetPriorities').then(responseBody),
}

const auth = {
    login: (user: any) => axios.post('api/account/login', user).then(responseBody),
    register: (user: any) => axios.post('api/account/signup', user).then(responseBody),
    UserProfile: () => axios.get('api/account/userProfile').then(responseBody),
    changePassword:(password:any)=>axios.post('api/account/changePassword', password).then(responseBody),
}

const agent ={
    TodoTask,
    Priority,
    auth
}

export default agent;