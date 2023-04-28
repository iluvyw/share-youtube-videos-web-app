import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { IResponseUser } from "../interfaces/firebase";

const useFirestore = () => {
  initializeApp(firebaseConfig);
  const db = getFirestore();

  const getAllUsers = async () => {
    try {
      const collectionRef = collection(db, "users");
      const snapshot = await getDocs(collectionRef);
      const users = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return users as IResponseUser[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { getAllUsers };
};

export { useFirestore };
