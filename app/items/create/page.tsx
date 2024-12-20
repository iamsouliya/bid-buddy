'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createItemAction, createUploadUrl } from './actions'
import { pageTitleStyles } from '@/app/styles'

export default function CreatePage() {
  return (
    <main className="space-y-12">
      <h1 className={pageTitleStyles}>Post an Item</h1>
      <form
        className=" flex flex-col border rounded-xl p-8 space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget as HTMLFormElement
          const formData = new FormData(form)

          const file = formData.get('file') as File

          const uploadUrl = await createUploadUrl(file.name, file.type)

          await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
          })

          const name = formData.get('name') as string
          const startingPrice = Math.floor(
            parseFloat(formData.get('startingPrice') as string) * 100
          )

          await createItemAction({
            fileName: file.name,
            name,
            startingPrice,
          })
        }}
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
        <Input type="file" name="file" placeholder="image" />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  )
}
