const Multiparty = require('multiparty')
const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const clc = require('cli-color')
const express = require('express')

const STATIC_TEMPORARY = path.resolve(__dirname, './temporary')

const app = express()
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.post('/upload', (req, res) => {

    const multipart = new Multiparty.Form();
    const myEmitter = new EventEmitter();

    const formData = {
        filename: undefined,
        hash: undefined,
        chunk: undefined,
    }

    let isFieldOk = false, isFileOk = false;

    multipart.parse(req, function (err, fields, files) {
        formData.filename = fields['filename'][0];
        formData.hash = fields['hash'][0];

        isFieldOk = true;
        myEmitter.emit('start');
    });

    multipart.on('file', function (name, file) {
        formData.chunk = file;
        isFileOk = true;
        myEmitter.emit('start');
    });

    myEmitter.on('start', function () {
        if (isFieldOk && isFileOk) {
            const { filename, hash, chunk } = formData;
            const dir = `${STATIC_TEMPORARY}/${filename}`;

            try {
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);

                const buffer = fs.readFileSync(chunk.path);
                const ws = fs.createWriteStream(`${dir}/${hash}`);
                ws.write(buffer);
                ws.close();

                res.send(`${filename}-${hash} 切片上传成功`)
            } catch (error) {
                console.error(error);
            }

            isFieldOk = false;
            isFileOk = false;

        }
    });
});

const { Buffer } = require('buffer')
const STATIC_FILES = path.resolve(__dirname, './files')

app.get('/merge', async (req, res) => {
    const { filename } = req.query;

    try {
        let len = 0;
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map(hash => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${hash}`);
            len += buffer.length;
            return buffer;
        });

        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`);
        ws.write(buffer);
        ws.close();

        res.send(`切片合并完成`);
    } catch (error) {
        console.error(error);
    } finally {
        deleteFolder(`${STATIC_TEMPORARY}/${filename}`)
    }
})

function deleteFolder(filepath) {
    console.log("删除", filepath)
    if (fs.existsSync(filepath)) {
        fs.readdirSync(filepath).forEach(filename => {
            const fp = `${filepath}/${filename}`;
            if (fs.statSync(fp).isDirectory()) deleteFolder(fp);
            else fs.unlinkSync(fp);
        });
        console.log('filepath', filepath)
        fs.rmdirSync(filepath);
    }
}

app.listen(3010, () => {
    console.log('server is running at ' + clc.bold.blue.underline('http://localhost:3010/'));
    console.log('server is running at ' + clc.bold.blue.underline('http://127.0.0.1:3010/'));
})