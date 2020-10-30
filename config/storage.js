require('dotenv-expand')(require('dotenv').config());
import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

// setup gridfs with mongodb
Grid.mongo = mongoose.mongo;

const conn = mongoose.createConnection(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;

conn.once('open', () => {
    console.log("DB connected");

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

const storage = new GridFsStorage({
    url: process.env.DB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo={
                filename: filename,
                bucketName: 'images'
            }

            resolve(fileInfo);
     })}
});

const upload = multer({ storage });

export default upload;