import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { database } from '@/db/database'
import { items } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  const session = await auth()

  return (
    <main className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((i) => (
          <div className="border p-8 rounded-lg" key={i.id}>
            {i.name}
            starting price: {i.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  )
}
