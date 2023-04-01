const express=require('express');
const port=8000;
const app= express();

//to use express router:
app.use('/', require('./routes'));

app.listen(port, function(error){
    if (error){
        console.log(`OOPSSSIIIEEEE!! There was an error while trying to run the server:${error}`);
        return ;
    }
    console.log(`Yayy!!! The server is UP and Running on port: ${port}`);
})