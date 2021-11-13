import express from 'express';
import path from 'path'

const dir = path.join(__dirname + '/../static'); 
const app = express();

app.use(express.static(dir))

app.listen(8080, () => console.log('Listening'));

app.get('/', (req,res) => {
    res.sendFile(dir + '/pages/home.html');
})