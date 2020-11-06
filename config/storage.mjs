import dotenv from 'dotenv';
import dotenv_expand from 'dotenv-expand';

import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

// setup access to environment variables
dotenv_expand(dotenv.config());

function connect() {
    // setup gridfs with mongodb
    Grid.mongo = mongoose.mongo;

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
            })
        }
    });

    const upload = multer({ storage });
    
    const conn = mongoose.createConnection(process.env.DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return { conn, upload };
}

function close(conn) {
    return conn.disconnect();
}

export default { connect, close };