import { database } from '@/db/database'
import { bids as bidsSchema } from '@/db/schema'

export default async function Home() {
  const bids = await database.query.bids.findMany()

  return (
    <main>
      <form
        action={async (formData: FormData) => {
          'use server'
          // const bid = formData.get('bid') as string
          await database.insert(bidsSchema).values({})
        }}
      >
        <input type="number" name="bid" placeholder="Enter bid" />
        <button type="submit">Place Bid</button>
      </form>
      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  )
}
