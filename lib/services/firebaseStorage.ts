// lib/services/firebaseStorage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '@/lib/services/firebase' // Your client-side Firebase config

const firebaseStorage = getStorage(app)

export async function uploadPdfToStorage(
  file: File,
  submissionId: string
): Promise<string> {
  const storageRef = ref(firebaseStorage, `premium-docs/${submissionId}/${file.name}`)
  
  await uploadBytes(storageRef, file)
  const downloadUrl = await getDownloadURL(storageRef)
  
  return downloadUrl
}

