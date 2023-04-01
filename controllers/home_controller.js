module.exports.home=function(req,res){
    // return res.end('<h1>Express running for codeial</h1>');
    return res.render('home',{
        title:"HomeComing",
        intro: "Home Created"
    }
    )
}