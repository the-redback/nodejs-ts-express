import * as bodyParser from 'body-parser';
import * as express from 'express';

const PORT = parseInt(String(process.env.PORT), 10) || 3000;
const app = express();

app.use(bodyParser.json());

app.post('/login', (req: express.Request, res: express.Response) => {
  const {username, password} = req.body;
  console.log('Login user: ', username, password);
  const msg = {
    action: 'LOGIN',
    data: {username, password},
    time: Date().toString(),
  };

  console.log('/login', msg);
  return res.send(msg);
});

app.post('/tasks', (req: express.Request, res: express.Response) => {
  const {msg} = req.body;

  console.log('/tasks', msg);
  return res.send(msg);
});

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('/');
  res.send('Hello World');
});

app.get('/send-msg', (req: express.Request, res: express.Response) => {
  const data = {
    msg: 'Hello from the other side!!',
    time: Date().toString(),
  };

  console.log('/send-msg', data);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
