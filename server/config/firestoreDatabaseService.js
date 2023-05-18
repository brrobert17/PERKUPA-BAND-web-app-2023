import {collection, getDoc, getDocs, doc, addDoc, deleteDoc, setDoc} from "firebase/firestore";
import {db} from "./firebase.js";

export const readDocs = async (path) => {
    const docs = await getDocs(collection(db, path));
    const data = [];
    docs.forEach((doc) => {
        data.push({
            id: doc.id,
            data: doc.data()
        })
    });
    return data;
};

export const readDocById = async (path, id) => {
    const docRef = doc(db, path, id);
    const document = await getDoc(docRef);
    return {
        id: document.id,
        data: document.data()
    };
};

export const createDoc = async (path, document) => {
    const docRef = await addDoc(collection(db, path), document);
    return {
        id: docRef.id,
        data: document
    };
};

export const deleteDocById = async (path, id) => {
    const docRef = await doc(db, path, id);
    await deleteDoc(docRef);
    return {id: docRef.id};
};
export const updateDocById = async (path, id, document) => {
    const docRef = await doc(db, path, id);
    await setDoc(docRef, document, {merge: true});
    const updatedDocument = await getDoc(docRef);
    return {
        id: updatedDocument.id,
        data: updatedDocument.data()
    };
};