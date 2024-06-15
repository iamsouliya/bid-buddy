import { auth } from '@/auth'
import { SignIn } from '@/components/SignIn'
import { SignOut } from '@/components/SignOut'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { database } from '@/db/database'
import { items } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allItems = await database.query.items.findMany()

  const session = await auth()

  return (
    <main className="container mx-auto py-12">
      {!session?.user ? <SignIn /> : <SignOut />}
      {session?.user?.name}
      <form
        action={async (formData: FormData) => {
          'use server'
          // const bid = formData.get('bid') as string
          await database.insert(items).values({
            name: formData.get('name') as string,
            userId: session?.user?.id!,
          })

          revalidatePath('/')
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>
      {allItems.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </main>
  )
}
