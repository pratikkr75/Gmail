import  mongoose  from "mongoose";



const Connection = async () => {

    const DB_URI = `mongodb+srv://pratikkr75:3559prateek@cluster0.bxtjqzg.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with database', error.message);
    }
}


export default Connection;


