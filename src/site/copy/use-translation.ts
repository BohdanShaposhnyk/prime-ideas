import { rich } from './rich'
import { t } from './translate'

export function useTranslation() {
  return { t, rich }
}
