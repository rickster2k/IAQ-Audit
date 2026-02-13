'use server'

import { getAdminStorage } from "@/lib/services/firebaseAdmin";



export async function deletePdf(submissionId: string, pdfName: string) {
console.log("Searching for pdfs with submissionId: ", submissionId, " name: ", pdfName)
    try {
        const bucketName = process.env.FIREBASE_STORAGE_BUCKET

        if (!bucketName) {
            throw new Error("FIREBASE_STORAGE_BUCKET not defined")
        }

        const adminStorage = getAdminStorage()
        const bucket = adminStorage.bucket(bucketName)

        // Ensure no duplicate .pdf extension
        const cleanName = pdfName.endsWith(".pdf")
            ? pdfName
            : `${pdfName}.pdf`

        const filePath = `premium-docs/${submissionId}/${cleanName}`

        const file = bucket.file(filePath)

        // Check if file exists before deleting (optional but safer)
        const [exists] = await file.exists()

        if (!exists) {
            return {
            success: false,
            error: "File not found"
            }
        }

        await file.delete()

        console.log("Deleted:", filePath)

        return {
            success: true
        }

    } 
    catch (error) {
        console.error("Error deleting PDF:", error)

        return {
            success: false,
            error: "Failed to delete PDF"
        }
        }
    }