import {getStorage, ref} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {firebaseConfig} from "../firestore-private/config.js";


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
export const storageImagesRef = ref(storage, "images");