import mongoose from 'mongoose';

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDB = async () => {
    const connectionUrl = 'mongodb+srv://kritikaaasinghhh:<Kritikas1212>@cluster0.ohmyaki.mongodb.net/';
    
    try {
        await mongoose.connect(connectionUrl, configOptions);
        console.log('Database connected successfully!');
    } catch (err) {
        console.log(`Getting error from DB connection: ${err.message}`);
    }
}

export default connectToDB;
