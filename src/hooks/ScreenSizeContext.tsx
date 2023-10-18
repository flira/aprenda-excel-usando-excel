import {
  Context,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

/** @see useScreenSize */
export type ScreenSize = 'large' | 'small'

const initialScreenSize: ScreenSize = 'large' as ScreenSize
const ScreenSizeContext: Context<ScreenSize> =
  createContext(initialScreenSize)

/** 
 * Provide context for the screen size.
 * @see useScreenSize
 */
export function ScreenSizeProvider(
  { children }: { children: ReactNode }
): JSX.Element {
  const [screenSize, setScreenSize] = useState(initialScreenSize)

  const updateState: () => void = () => {
    setScreenSize(getScreenSize())
  }

  useEffect(() => {
    updateState()
    window.addEventListener('resize', updateState)
    return () => {
      window.removeEventListener('resize', updateState)
    }
  }, [false])

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

/** Returns if the screen is bigger or smaller than 1024px. */
export function useScreenSize(): ScreenSize {
  return useContext(ScreenSizeContext)
}

function getScreenSize(): ScreenSize {
  return window.matchMedia("(max-width: 1023px)").matches ? 'small' : 'large'
}

export default useScreenSize