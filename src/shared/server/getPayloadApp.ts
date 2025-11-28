import type { Payload } from 'payload'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

let cachedPayload: Payload | null = null

/**
 * Единая точка доступа к Payload SDK в приложении.
 * Payload создаёт тяжёлый инстанс, поэтому кэшируем его и переиспользуем.
 */
export async function getPayloadApp(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config: configPromise })
  return cachedPayload
}
