import { database } from '@/db/database'
import ItemCard from '../ItemCard'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { items } from '@/db/schema'
import EmptyState from './EmptyState'

export default async function MyAuctions() {
  const session = await auth()

  if (!session) {
    throw new Error('Not logged in')
  }

  if (!session.user || !session.user.id) {
    throw new Error('Not logged in')
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id),
  })

  const hasItems = allItems.length > 0

  return (
    <main className="space-y-12">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          <>
            {allItems.map((i) => (
              <ItemCard i={i} key={i.id} />
            ))}
          </>
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  )
}
