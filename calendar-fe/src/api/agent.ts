import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (resp: AxiosResponse) => resp.data;

const TodoTask={
    get: () => axios.get('Task/GetTasks').then(responseBody),
    create: (task: any) => axios.post('Task/AddTask',task).then(responseBody),
}

const Priority={
    list: () => axios.get('Task/GetPriorities').then(responseBody),
}

const agent ={
    TodoTask,
    Priority
}

export default agent;