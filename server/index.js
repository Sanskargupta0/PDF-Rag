import express from 'express'
import cors from 'cors'
import multer from 'multer'
import 'dotenv/config'


//App config
const app = express()
const port = process.env.PORT || 4000

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })



//middleware
app.use(express.json())
app.use(cors({
    origin: [
      process.env.FRONTEND_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    exposedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}))

// ✅ Global CORS Response Headers Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

//api-end points
app.get("/", (req, res) => {
    res.status(200).send("PDF RAG Server");
  });
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully');
  });

app.listen(port, ()=> console.log('Server started on PORT : '+ port))