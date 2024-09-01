import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDB = async () => {
    const connectionUrl = mongodb + srv://kritikaaasinghhh:Kriitkas1212@cluster0.tk84jbi.mongodb.net/
        mongoose.connect(connectionUrl, configOptions).then(() => console.log('Database connected successfully!'))
            .catch((err) =>
                console.log('Getting error from DB connection ${err.message}'));
}

export default connectToDB; 