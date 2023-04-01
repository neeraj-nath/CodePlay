const express=require('express');
const port=8000;
const app= express();
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose');
app.use(expressLayouts);
app.use(express.static('assets'))
//to use express router:
app.use('/', require('./routes'));


app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
// To set the view engine:
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(error){
    if (error){
        console.log(`OOPSSSIIIEEEE!! There was an error while trying to run the server:${error}`);
        return ;
    }
    console.log(`Yayy!!! The server is UP and Running on port: ${port}`);
})
