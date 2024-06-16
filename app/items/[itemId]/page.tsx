import { pageTitleStyles } from '@/app/styles'
import { getImageUrl } from '@/app/utils/files'
import { Button } from '@/components/ui/button'
import { database } from '@/db/database'
import { items } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { formatToDollars } from '@/app/utils/currency'

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string }
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  })

  if (!item) {
    return (
      <div className="space-y-8 flex items-center flex-col mt-12">
        <Image src={'/packages.svg'} alt="Package" width={200} height={200} />

        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid. <br /> Please go back
          and search for a different auction item
        </p>

        <Button asChild>
          <Link href={'/'}>View Auctions</Link>
        </Button>
      </div>
    )
  }

  // const bids = [
  //   {
  //     id: 1,
  //     amount: 1000,
  //     user: 'John Doe',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 1200,
  //     user: 'Jane Doe',
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 3,
  //     amount: 1400,
  //     user: 'Bob Doe',
  //     timestamp: new Date(),
  //   },
  // ]

  const bids = []

  const hasBids = bids.length > 0

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            className="rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
          />
          <div className="text-xl space-y-4">
            <div>
              <span className="font-normal">Starting Price of </span>
              <span className="font-bold">
                ${formatToDollars(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid Interval{' '}
              <span className="font-bold">
                {formatToDollars(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <h2 className="text-2xl font-bold">Current Bids</h2>

          {hasBids ? (
            <ul className="space-y-4">
              {bids.map((bid) => (
                <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                  <div className="flex gap-4 items-center">
                    <div>
                      <span className="font-bold">${bid.amount / 100} by </span>
                      <span className="font-bold">{bid.user}</span>
                    </div>
                    <div>{formatTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="gap-8 flex items-center flex-col bg-gray-100 rounded-xl p-12">
              <Image
                src={'/packages.svg'}
                alt="Package"
                width={200}
                height={200}
              />
              <h2 className="text-2xl font-bold">No bids yet</h2>
              <Button>Place a bid</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
