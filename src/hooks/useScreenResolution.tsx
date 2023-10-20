import { useState, useEffect } from "react"

/**
 * Avoid scaling up background images
 * more than their original size
 */
function useScreenResolution() {
  const [resolution, setResolution] = useState(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1
  );

  const updateState: () => void = () => {
    const res: number = window.devicePixelRatio > 1 ?
      window.devicePixelRatio : 1
    setResolution(res)
  }

  useEffect(() => {
    updateState()
    window.addEventListener('resize', updateState)
    return () => {
      window.removeEventListener('resize', updateState)
    }
  }, [resolution])

  const updateCssVar: () => void = () => {
    (document.querySelector(':root') as HTMLElement)?.style
      .setProperty('--resolution', `${resolution}`)
  }

  useEffect(updateCssVar, [resolution])
}

export default useScreenResolution;