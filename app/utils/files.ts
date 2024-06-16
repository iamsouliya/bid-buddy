import { env } from '@/env'

export function getImageUrl(fileKey: string) {
  return `${env.NEXT_PUBLIC_FILE_URL}/${fileKey}`
}
