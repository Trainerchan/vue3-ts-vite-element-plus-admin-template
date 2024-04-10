import { getCurrentInstance, type ComponentInternalInstance } from 'vue'
import _ from 'lodash'
import mitt from 'mitt'
import { MittEvents } from '@/types/mittEvent'

export const lodash = _
export const mittBus = mitt<MittEvents>()

export function useGlobalProperties() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  return appContext.config.globalProperties
}
