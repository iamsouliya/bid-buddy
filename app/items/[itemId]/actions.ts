'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { bids, items } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function createBidAction(itemId: number) {
  const sessions = await auth()

  if (!sessions) {
    throw new Error('Not logged in')
  }

  if (!sessions.user || !sessions.user.id) {
    throw new Error('Not logged in')
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  })

  if (!item) {
    throw new Error('Item not found')
  }

  const latestBidValue = item.currentBid + item.bidInterval

  await database.insert(bids).values({
    itemId,
    userId: sessions.user.id,
    amount: latestBidValue,
    timestamp: new Date(),
  })

  await database
    .update(items)
    .set({ currentBid: latestBidValue })
    .where(eq(items.id, itemId))

  revalidatePath(`/items/${itemId}`)
}
