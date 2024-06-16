import { database } from '@/db/database'
import Image from 'next/image'
import { getImageUrl } from './utils/files'
import ItemCard from './ItemCard'
import { pageTitleStyles } from './styles'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  return (
    <main className="space-y-12">
      <h1 className={pageTitleStyles}>Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((i) => (
          <ItemCard i={i} key={i.id} />
        ))}
      </div>
    </main>
  )
}
