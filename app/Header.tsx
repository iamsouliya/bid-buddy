'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react'
import { useRef, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const session = useSession()
  const userId = session.data?.user?.id
  const [isVisible, setIsVisible] = useState(false)
  const notifButtonRef = useRef(null)
  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href={'/'} className="hover:underline flex items-center gap-1">
            <Image src={'/logo.png'} alt="logo" height={50} width={50} />
            BidBuddy.com
          </Link>

          <div className="flex gap-8 items-center">
            <Link
              href={'/'}
              className="hover:underline flex items-center gap-1"
            >
              All Auctions
            </Link>
            {userId && (
              <>
                <Link
                  href={'/items/create'}
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>
                <Link
                  href={'/auctions'}
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
          {session.data?.user?.image && (
            <Image
              src={session?.data?.user?.image}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {!userId ? (
              <Button onClick={() => signIn('google')}>
                Signin with Google
              </Button>
            ) : (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
