import {Router} from "express";
import { collection, getDocs } from "firebase/firestore";
import {db, storage, storageImagesRef} from "../config/firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import multer from 'multer';


const router = Router();
const upload = multer().single('image');

router.get("/test", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
    });
    res.send({data: "test"});
});

router.get("/test/image", async (req, res)=> {

    const imageRef = ref(storageImagesRef, '/perkupa1c.png');
    let url;
    await getDownloadURL(imageRef).then((res) => {
        url = res;
    });
    res.send({data: url});

})

router.post("/test/image", upload, async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `images/${dateTime}`);

        const snapshot = await uploadBytes(storageRef, Buffer.from(req.body.file, 'base64'), {
            contentType: 'image/png'
        });

        //console.log(req.body.file);
        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
export default router;