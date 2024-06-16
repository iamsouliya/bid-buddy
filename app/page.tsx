import { database } from '@/db/database'
import Image from 'next/image'
import { getImageUrl } from './utils/files'
import ItemCard from './ItemCard'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  return (
    <main className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((i) => (
          <ItemCard i={i} key={i.id} />
        ))}
      </div>
    </main>
  )
}
