import {
  Context,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

/** @see useScreenSize */
export type ScreenSize = 'medium' | 'narrow' | 'wide'

const initialScreenSize: ScreenSize = 'medium' as ScreenSize
const ScreenSizeContext: Context<ScreenSize> = createContext(initialScreenSize)

/** 
 * Provide context for the screen size.
 * @see useScreenSize
 */
export function ScreenSizeProvider(
  { children }: { children: ReactNode }
): JSX.Element {
  const [screenSize, setScreenSize] = useState(
    typeof window !== 'undefined' ? getScreenSize() : initialScreenSize
  )

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
  const queries: { [key: string]: string } = {
    medium: '(min-width: 40rem) and (max-width: 79rem)',
    narrow: '(max-width: 39rem)',
    wide: '(min-width: 80rem)'
  }
  return Object.keys(queries).find(
    query => matchMedia(queries[query]).matches
  ) as ScreenSize
}

export default useScreenSize