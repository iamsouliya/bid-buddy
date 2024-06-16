import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { database } from '@/db/database'
import { items } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { createItemAction } from './actions'

export default async function CreatePage() {
  const allItems = await database.query.items.findMany()

  return (
    <main className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        className=" flex flex-col border rounded-xl p-8 space-y-4 max-w-lg"
        action={createItemAction}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
      <h2 className="text-2xl font-bold">Items For Sale</h2>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((i) => (
          <div className="border p-8 rounded-lg" key={i.id}>
            {i.name}
          </div>
        ))}
      </div>
    </main>
  )
}
