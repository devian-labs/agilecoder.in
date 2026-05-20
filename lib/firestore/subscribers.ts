import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
}

const ref = collection(db, "subscribers")

export async function addSubscriber(email: string): Promise<void> {
  const existing = await getDocs(query(ref, where("email", "==", email.toLowerCase().trim())))
  if (!existing.empty) return // already subscribed
  await addDoc(ref, {
    email: email.toLowerCase().trim(),
    subscribedAt: serverTimestamp(),
  })
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const snap = await getDocs(query(ref, orderBy("subscribedAt", "desc")))
  return snap.docs.map((d) => {
    const data = d.data()
    return {
      id: d.id,
      email: data.email,
      subscribedAt:
        data.subscribedAt instanceof Timestamp
          ? data.subscribedAt.toDate().toISOString()
          : new Date().toISOString(),
    }
  })
}

export async function deleteSubscriber(id: string): Promise<void> {
  await deleteDoc(doc(db, "subscribers", id))
}

export async function getSubscriberCount(): Promise<number> {
  const snap = await getDocs(ref)
  return snap.size
}
