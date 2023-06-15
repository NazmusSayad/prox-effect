import proxEffect from './index'
import { useEffect, useState, MutableRefObject, RefObject } from 'react'

function useProxEffect(
  anchorRef: HTMLElementRef,
  containerRef?: HTMLElementRef
) {
  const [degree, setDegree] = useState(0)

  useEffect(() => {
    if (!anchorRef?.current) {
      throw new Error('Unable to get anchorRef.current')
    }

    const effect = proxEffect({
      handler: setDegree,
      anchor: anchorRef.current,
      container: containerRef?.current || undefined,
    })

    return effect.abort
  }, [])

  return degree
}

export default useProxEffect
export type HTMLElementRef =
  | MutableRefObject<HTMLElement | undefined | null>
  | RefObject<HTMLElement | undefined | null>
