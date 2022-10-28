import app from './express';
import mongoose from 'mongoose';
import config from './config/config';

const app=express();
dotenv.config();

const connect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to db');
    })
    .catch((err)=>{
        throw err;
    })
}

app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    connect();
    console.log('Server is running on port 3000');
})
