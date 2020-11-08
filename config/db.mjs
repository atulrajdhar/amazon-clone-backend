import dotenv from 'dotenv';
import dotenv_expand from 'dotenv-expand';
import mongoose from 'mongoose';

import pusher from './pusher';

dotenv_expand(dotenv.config());

function connect() {
    mongoose.set('useFindAndModify', false);

    mongoose.connection.once('open', () => {
        console.log("DB Connected");

        const changeStream = mongoose.connection.collection("orders").watch();

        changeStream.on("change", (change) => {
            console.log(change);

            if(change.operationType === "insert") {
                console.log("Triggering Pusher");

                pusher.trigger("orders", "inserted", {
                    change: change
                })
            }
            else {
                console.log("Error triggering Pusher");
            }
        })
    });

    return new Promise((resolve, reject) => {        
        mongoose.connect(process.env.DB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((res, err) => {
            if(err) return reject(err);
            resolve();
        });        
    });
}

function close() {
    return mongoose.disconnect();
}

export default { connect, close };