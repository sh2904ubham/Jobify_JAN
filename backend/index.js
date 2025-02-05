import express from 'express';

const app=express();
const PORT=3000;

app.use(express.json);
app.use(express.urlencoded({extended:true}));

app.get('/',()=>{
    console.log('hello');
})
app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
    
})

