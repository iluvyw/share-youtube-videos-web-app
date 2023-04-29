import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { IResponseUser } from "../interfaces/firebase";
import { Response } from "../enums/response";
import { IVideo } from "../interfaces/video";

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

  const getUser = async (
    username: string
  ): Promise<IResponseUser | undefined> => {
    try {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      const docs: IResponseUser[] = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const username = doc.data().username;
        const password = doc.data().password;
        const salt = doc.data().salt;
        docs.push({ id, username, password, salt });
      });
      if (docs[0]) {
        return docs[0];
      }
      return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const addUser = async (
    username: string,
    password: string,
    salt: string
  ): Promise<Response> => {
    const collectionRef = collection(db, "users");
    try {
      await addDoc(collectionRef, {
        username,
        password,
        salt,
      });
      return Response.SUCCESS;
    } catch (error) {
      console.error(error);
      return Response.ERROR;
    }
  };

  const getAllVideos = async () => {
    try {
      const collectionRef = collection(db, "videos");
      const snapshot = await getDocs(collectionRef);
      const videos = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      return videos as IVideo[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const addVideo = async (video: IVideo): Promise<Response> => {
    const collectionRef = collection(db, "videos");
    try {
      await addDoc(collectionRef, video);
      return Response.SUCCESS;
    } catch (error) {
      console.error(error);
      return Response.ERROR;
    }
  };

  return { getAllUsers, addUser, getUser, addVideo, getAllVideos };
};

export { useFirestore };
