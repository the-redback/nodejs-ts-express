import * as bodyParser from 'body-parser';
import * as express from 'express';

const PORT = parseInt(String(process.env.PORT), 10) || 3000;
const app = express();

app.use(bodyParser.json());

app.post(
  '/api/express/login',
  (req: express.Request, res: express.Response) => {
    const {username, password} = req.body;
    console.log('Login user: ', username, password);
    const msg = {
      action: 'LOGIN',
      data: {username, password},
      time: Date().toString(),
    };

    console.log('/api/express/login', msg);
    return res.send(msg);
  }
);

app.post(
  '/api/express/tasks',
  (req: express.Request, res: express.Response) => {
    const {msg} = req.body;

    console.log('/api/express/tasks', msg);
    const secs = msg.split('.').length - 1;

    console.log(' [x] Starting task: Waiting ',secs);
    setTimeout(() => {
      console.log(' [x] Done');
    }, secs * 1000);

    return res.send('Done');
  }
);

app.get('/api/express/', (req: express.Request, res: express.Response) => {
  console.log('/api/express/');
  res.send('Hello World');
});

app.get(
  '/api/express/send-msg',
  (req: express.Request, res: express.Response) => {
    const data = {
      msg: 'Hello from the other side!!',
      time: Date().toString(),
    };

    console.log('/api/express/send-msg', data);
    res.send(data);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
