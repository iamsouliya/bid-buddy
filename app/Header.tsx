import Image from 'next/image'
import { SignIn } from '@/components/SignIn'
import { SignOut } from '@/components/SignOut'
import { auth } from '@/auth'
import Link from 'next/link'

export default async function Header() {
  const session = await auth()
  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href={'/'} className="hover:underline flex items-center gap-1">
            <Image src={'/logo.png'} alt="logo" height={50} width={50} />
            BidBuddy.com
          </Link>

          <div>
            <Link
              href={'/items/create'}
              className="hover:underline flex items-center gap-1"
            >
              Auction an Item
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>{session?.user?.name}</div>
          <div>{!session?.user ? <SignIn /> : <SignOut />}</div>
        </div>
      </div>
    </div>
  )
}
