var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(`
  <html>
    <body>
      <form ref='uploadForm' 
        id='uploadForm' 
        action='http://localhost:8000/post' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
      </form>     
    </body>
  </html>

`);
});

router.post('/post', function(req, res, next) {
  try {
    console.log(req.body,req.files)
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;
        
        //Use the mv() method to place the file in the upload directory (i.e. "uploads")
        avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}

});

module.exports = router;
