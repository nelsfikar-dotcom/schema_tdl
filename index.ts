import express from 'express';
import * as userAPI from './src/db/app/users/userAPI';
import * as taskAPI from './src/db/app/tasks/taskAPI';
import * as listTaskAPI from './src/db/app/tasks_list/listTaskAPI';
import { loginUser } from './src/db/app/auth/loginAPI';
import { registerUser } from './src/db/app/auth/regisAPI';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

//USER
app.get('/users', userAPI.getAlluser);
app.post('/users', userAPI.createUser);
app.get('/users/:id', userAPI.findMyUserById);
app.put('/users/:id', userAPI.updateUser);
app.delete('/users/:id', userAPI.deleteUser);

//TASK
app.get('/tasks', taskAPI.getAlltask);
app.post('/tasks', taskAPI.createTask);
app.get('/tasks/:id', taskAPI.findTaskById);
app.put('/task/:id', taskAPI.updateTask);
app.delete('/tasks/:id', taskAPI.deleteTask);

//TASK_LIST
app.get('/task_list', listTaskAPI.getAllTaskList);
app.post('/task_list', listTaskAPI.createListTask);
app.get('/task_list/:id', listTaskAPI.findListTaskById);
app.put('/task_list/:id', listTaskAPI.updateListTask);
app.delete('/task_list/:id', listTaskAPI.deleteListTask)

app.post('/register', registerUser);
app.post('/login',  loginUser);

app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});