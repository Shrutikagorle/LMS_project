import mongoose from 'mongoose';

//conect to mongodb data base

const connectDB= async ()=>{
    mongoose.connection.on('connected', ()=>console.log('Database connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)

}

export default connectDB;