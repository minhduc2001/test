const path = require('path')
const fs = require('fs')
const db = require('../config/firebase')
const { collection, getDocs, addDoc, where, query, setDoc, doc } = require('firebase/firestore/lite');

// let file = '';
class HomeController {
    homePage(req, res) {

        res.send('vip nhat sv')
    }
    async sendListSongs(req, res) {
        try {
            const q = collection(db, 'music');
            const musicSnapshot = await getDocs(q);
            const musics = musicSnapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data()
            }));

            res.status(200).json(musics)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async pushMusic(req, res) {
        try {
            addDoc(collection(db, "music"),
                req.body
            );


            res.send(200)
        } catch (error) {

        }
    }

    async getAllcommentByMusic(req, res) {
        console.log('vào day');
        try {
            const q = query(collection(db, "comment"), where("Music", "==", req.query.id));

            const querySnapshot = await getDocs(q);

            const data = []
            querySnapshot.forEach(async (doc) => {
                await data.push(doc.data())
            });

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async pushedComment(req, res) {
        try {
            addDoc(collection(db, "comment"),
                req.body
            );
            res.status(200).json('save ok!');
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // revc(req, res) {
    //     try {
    //         file = path.join(process.cwd(), '/public/music/' + req.body.name + '.mp3');
    //         console.log(file);
    //         res.status(200).json("OK");
    //     } catch (error) {
    //         res.status(500).json("err")
    //     }

    // }
    download(req, res) {

        const file = path.join(process.cwd(), '/public/music/' + req.query.id + '.mp3');
        res.download(file);
    }
    async handle(req, res) {

        const file = path.join(process.cwd(), '/public/music/' + req.query.id + '.mp3');
        
        console.log(file);
        const stat = await fs.statSync(file);
        const total = stat.size;
        if (req.headers.range) {
            console.log(req.headers.range);
            // res.status(200).json("lol")
            fs.exists(file, async (exists) => {
                if (exists) {
                    const range = req.headers.range;
                    const parts = range.replace(/bytes=/, '').split('-');
                    const partialStart = parts[0];
                    const partialEnd = parts[1];

                    const start = parseInt(partialStart, 10);
                    const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
                    const chunksize = (end - start) + 1;
                    const rstream = await fs.createReadStream(file, { start: start, end: end });


                    await res.writeHead(206, {
                        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                        'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                        'Content-Type': 'audio/mpeg'

                    });
                    await rstream.pipe(res);

                } else {
                    res.send('Error - 404');
                    res.end();
                    // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
                    // fs.createReadStream(path).pipe(res);
                }
            })
        }

    }

}
module.exports = new HomeController();