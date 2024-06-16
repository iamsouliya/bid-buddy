'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { items } from '@/db/schema'
import { getSignedUrlForS3Object } from '@/lib/s3'
import { redirect } from 'next/navigation'

export async function createUploadUrl(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type)
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string
  name: string
  startingPrice: number
}) {
  const session = await auth()

  const user = session?.user

  if (!session) {
    throw new Error('Not logged in')
  }

  if (!user || !user.id) {
    throw new Error('Not logged in')
  }

  await database.insert(items).values({
    name,
    startingPrice: Math.floor(startingPrice * 100),
    fileKey: fileName,
    userId: user.id,
  })

  redirect('/')
}
