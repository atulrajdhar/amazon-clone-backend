require('dotenv-expand')(require('dotenv').config());
import mongoose from 'mongoose';

import pusher from './pusher.js';

mongoose.connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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