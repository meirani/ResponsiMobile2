// src/utils/firestore.ts
import { auth, db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';

// interface data
export interface toystory {
    id?: string;
    toy: string;
    story: string;
    status: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export const firestoreService = {
    // get collection ref for all users
    getGlobaltoystoryRef() {
        return collection(db, 'toystory');
    },

    // create
    async addtoystoryGlobal(toystory: Omit<toystory, 'id'>) {
        try {
            const toystoryRef = this.getGlobaltoystoryRef();
            const docRef = await addDoc(toystoryRef, {
                ...toystory,
                status: false,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error Tambah toystory:', error);
            throw error;
        }
    },

    async getGlobaltoystorys(): Promise<toystory[]> {
        try {
            const toystoryRef = this.getGlobaltoystoryRef();
            const q = query(toystoryRef, orderBy('updatedAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as toystory));
        } catch (error) {
            console.error('Error Get toystory:', error);
            throw error;
        }
    },

		// update
    async updatetoystory(id: string, toystory: Partial<toystory>) {
        try {
            const toystoryRef = this.getGlobaltoystoryRef();
            const docRef = doc(toystoryRef, id);
            await updateDoc(docRef, {
                ...toystory,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Error Update toystory:', error);
            throw error;
        }
    },

		// delete
    async deletetoystory(id: string) {
        try {
            const toystoryRef = this.getGlobaltoystoryRef();
            const docRef = doc(toystoryRef, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error Delete toystory:', error);
            throw error;
        }
    },

		// update status
    async updateStatus(id: string, status: boolean) {
        try {
            const toystoryRef = this.getGlobaltoystoryRef();
            const docRef = doc(toystoryRef, id);
            await updateDoc(docRef, { status: status, updatedAt: Timestamp.now() });
        } catch (error) {
            console.error('Error Update Status:', error);
            throw error;
        }
    }

}