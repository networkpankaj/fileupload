const express = require('express')
const multer = require('multer')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    if(!req.file) {
        return res.status(400).send('koi bhi files upload nhi hai')
    }
    res.send('File upload ho gyi')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})