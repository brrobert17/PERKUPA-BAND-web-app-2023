import {giveCurrentDateTime} from "../utils/utils.js";
import {getDownloadURL, ref, uploadBytes, deleteObject} from "firebase/storage";
import {storage} from "./firebase.js";

export const uploadImage = async (file) => {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `images/img${dateTime}`);
    const snapshot = await uploadBytes(storageRef, Buffer.from(file, 'base64'), {
        contentType: 'image/png'
    });
    const url = await getDownloadURL(snapshot.ref);
    return {url: url};
};

export const deleteImage = async (fileName) => {
  const imageRef = ref(storage, `images/${fileName}`);
  await deleteObject(imageRef);
};
