    const express = require('express');
    const router = express.Router();
    var path = require('path');



    
    router.get("/", async function(req,res){
        res.render(path.resolve('views/pages/index.ejs'), {msg : 0});  
    });

    module.exports = router;
