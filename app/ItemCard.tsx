import Image from 'next/image'
import { getImageUrl } from './utils/files'
import { Item } from '@/db/schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatToDollars } from './utils/currency'

export default function ItemCard({ i }: { i: Item }) {
  return (
    <div className="border p-8 rounded-lg space-y-2" key={i.id}>
      <Image
        src={getImageUrl(i.fileKey)}
        alt={i.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{i.name}</h2>
      <p className="text-lg">
        starting price: {formatToDollars(i.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${i.id}`}>Bid on Item</Link>
      </Button>
    </div>
  )
}
