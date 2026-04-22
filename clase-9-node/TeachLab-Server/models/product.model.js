import { db } from '../config/firebase.js';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

const productsRef = collection(db, 'products');

export const readProducts = async () => {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const findById = async (id) => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const filterByCategory = async (category) => {
    const q = query(productsRef, where("category", "==", category.toLowerCase()));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};