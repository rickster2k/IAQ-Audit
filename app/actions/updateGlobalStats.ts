'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { Submission } from '@/lib/types'
import { FieldValue } from 'firebase-admin/firestore'

export async function updateReportsAndRiskScore() {
  try {
    const adminDb = getAdminDb()
    await adminDb.runTransaction(async (transaction) => {
      const statsRef = adminDb.collection('globalStats').doc('stats')
      const submissionsRef = adminDb.collection('submissions')

      const statsSnap = await transaction.get(statsRef)

      if (!statsSnap.exists) {
        throw new Error('Global stats document does not exist.')
      }

      // Get all submissions
      const submissionsSnap = await submissionsRef.get()

      let totalScore = 0
      let count = 0

      submissionsSnap.forEach((doc) => {
        const submission = doc.data() as Submission
        if (submission?.result?.score !== undefined) {
          totalScore += submission.result.score
          count++
        }
      })

      const avgRiskScore = count > 0 ? totalScore / count : 0

      transaction.update(statsRef, {
        reports: FieldValue.increment(1),
        avgScore: avgRiskScore,
      })
    })

    return { success: true }

  } catch (error) {
    console.error('Error updating reports and risk score:', error)
    return {
      success: false,
      error: 'Failed to update reports and risk score.'
    }
  }
}

export async function incrementVisits() {
  try {
    const adminDb = getAdminDb()

    const statsRef = adminDb.collection('globalStats').doc('stats')

    await statsRef.update({
      visits: FieldValue.increment(1),
    })

    return { success: true }

  } catch (error) {
    console.error('Error incrementing visits:', error)
    return {
      success: false,
      error: 'Failed to increment visits.'
    }
  }
}


export async function incrementStarts() {
  try {
    const adminDb = getAdminDb()

    const statsRef = adminDb.collection('globalStats').doc('stats')

    await statsRef.update({
      starts: FieldValue.increment(1),
    })

    return { success: true }

  } catch (error) {
    console.error('Error incrementing starts:', error)
    return {
      success: false,
      error: 'Failed to increment starts.'
    }
  }
}

export async function updateAvgScore() {
  try {
    const adminDb = getAdminDb()

    //  Get all submissions
    const submissionsSnapshot = await adminDb.collection('submissions').get()
    const submissions = submissionsSnapshot.docs.map(doc => doc.data() as Submission)

    if (!submissions.length) {
      return {
        success: true,
        avgScore: 0.00,
      }
    }

    // Calculate average risk score
    const totalScore = submissions.reduce((sum, sub) => {
      const score = sub.result?.score ?? 0
      return sum + score
    }, 0)

    const averageRiskScore = (totalScore / submissions.length).toFixed(1)

    // Update globalStats document
    const statsRef = adminDb.collection('globalStats').doc('stats')
    await statsRef.update({
      avgScore: parseFloat(averageRiskScore),
    })

    return {
      success: true,
      avgScore: parseFloat(averageRiskScore),
    }
  } catch (error) {
    console.error('Error updating average risk score:', error)
    return {
      success: false,
      error: 'Failed to update average risk score.',
    }
  }
}


export async function updateShop(paymentUrl: string, pricePoint: string) {
  try {
    const adminDb = getAdminDb()

    // Update globalStats document with shop info
    const statsRef = adminDb.collection('globalStats').doc('stats')
    await statsRef.update({
      shop: {
            paymentUrl: paymentUrl,
            pricePoint: pricePoint,
        }
    })

    return {
      success: true,
      paymentUrl: paymentUrl,
      pricePoint: pricePoint,
    }
  } catch (error) {
    console.error('Error updating shop values:', error)
    return {
      success: false,
      error: 'Failed to update shop values.',
    }
  }
}