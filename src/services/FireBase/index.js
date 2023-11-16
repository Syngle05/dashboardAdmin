import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCqEja5dm2K_quk0UpU5hEVgZ_Cm4qiQ3c",
  authDomain: "dashboardeplataforma.firebaseapp.com",
  projectId: "dashboardeplataforma",
});

const db = getFirestore(firebaseApp);
const tokenCollectionRef = collection(db, "auth");
const ordersCollectionRef = collection(db, "orders");

export const getToken = async () => {
  const data = await getDocs(tokenCollectionRef);

  const filterData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filterData;
};

export const getOrdersFirebase = async () => {
  const data = await getDocs(ordersCollectionRef);
  const filterData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return filterData;
};

export const createOrderFirebase = async (IdOrder) => {
  const order = await addDoc(ordersCollectionRef, {
    IdOrder,
    isPaid: false,
  });
};

export const updateOrderFireBase = async (id, isPaid) => {
  const orderRef = doc(db, "orders", id);

  // Set 'isPaid' field of the order
  await updateDoc(orderRef, {
    isPaid,
  });
};

export const removeOrderFirebase = async (id) => {
  const orderRef = doc(db, "orders", id);
  await deleteDoc(orderRef);
};

// export const createItem = async (item) => {
//   const date = new Date();
//   const options = { timeZone: "America/Sao_Paulo", hour12: false };
//   const brazilDate = date.toLocaleDateString("pt-BR", options);
//   const data = await addDoc(prizeDrawCollectionRef, {
//     brazilDate,
//     item,
//   });
//   console.log("Document written with ID: ", data);
// };
