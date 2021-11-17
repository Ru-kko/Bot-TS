import express, { urlencoded } from 'express';
import path from 'path'
import cors from 'cors';

const dir = path.join(__dirname + '/../static'); 
const app = express();

app.use(express.static(dir));
app.use(cors());
app.use(urlencoded({extended: false}));

app.listen(8080, () => console.log('Listening'));

app.get('/', (req,res) => {
    res.sendFile(dir + '/pages/home.html');
})