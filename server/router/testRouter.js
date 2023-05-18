import {response, Router} from "express";
import {storage, storageImagesRef} from "../config/firebase.js";
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import multer from 'multer';
import {readDocs, readDocById, createDoc, deleteDocById, updateDocById} from "../config/firestoreDatabaseService.js";
import {giveCurrentDateTime} from "../utils/utils.js";
import {deleteImage, uploadImage} from "../config/firebaseStorageService.js";

const router = Router();
const upload = multer().single('image');

router.get("/test", (req, res) => {
    res.send({data: giveCurrentDateTime()});
})
router.get("/test/docs", async (req, res) => {
    const docs = await readDocs("users").catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send(docs);
});
router.get("/test/doc/:id", async (req, res) => {
    const doc = await readDocById("users", req.params.id).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send(doc);
});
router.post("/test/doc", async (req, res) => {
    const doc = await createDoc("users", req.body).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    console.log(doc);
    res.send(doc);
});
router.delete("/test/doc/:id", async (req, res) => {
    const doc = await deleteDocById("users", req.params.id).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send(doc);
});

router.patch("/test/doc/:id", async (req, res) => {
    const doc = await updateDocById("users", req.params.id, req.body).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send(doc);
});
router.get("/test/image", async (req, res) => {

    const imageRef = ref(storageImagesRef, '/perkupa1c.png');
    let url;
    await getDownloadURL(imageRef).then((res) => {
        url = res;
    });
    res.send({data: url});

})

router.post("/test/image", upload, async (req, res) => {
    const result = await uploadImage(req.body.file).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send(result);
});

router.delete("/test/image/:filename", async (req, res) => {
    await deleteImage(req.params.filename).catch((error) => {
        console.log(error);
        res.status(418).send(error);
    });
    res.send({message: `${req.params.filename} deleted`});
});
export default router;