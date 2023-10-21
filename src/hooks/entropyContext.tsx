/**
 * @file used for easter egg animation.
 */
import {
  Context,
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from "react"
import safeStorage, { SafeLocalStorage } from "./localStorage"

export type EntropyLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Entropy = {
  /** If the user tried to refresh the page after activating destruction */
  refresh: boolean,
  /** Entropy level. If Entropy reach maximum level, everything explodes. */
  value: EntropyLevel,
  /** Maximum level. */
  max: number
}

/** @see useEntropy */
let EntropyContext: Context<Entropy>
/** @see useEntropyDispatcher */
let EntropyDispatcherContext: Context<Dispatch<entropyReducerActions>>
const storage: SafeLocalStorage = safeStorage()
const entropyKey: string = 'entropy'

/**
 * Used for easter egg.
 * @see useEntropy
 * @see useEntropyDispatcher
 */
export function EntropyProvider(
  { children }: { children: ReactNode }
): JSX.Element {
  const initialValue: boolean | null = storage.load(entropyKey)
  const max: EntropyLevel = 6
  const entropyInit: Entropy = {
    refresh: !!initialValue,
    value: initialValue ? max : 0,
    max: max
  }

  const [entropy, dispatch] = useReducer(entropyReducer, entropyInit)

  EntropyContext = createContext(entropyInit)
  EntropyDispatcherContext = createContext(dispatch)

  return (
    <EntropyContext.Provider value={entropy}>
      <EntropyDispatcherContext.Provider value={dispatch}>
        {children}
      </EntropyDispatcherContext.Provider>
    </EntropyContext.Provider>
  )
}

/** 
 *  Used for easter egg.
 *  @returns
 *  Current Entropy Level, which varies from 0 to 6.
 *  0: Everything normal.
 *  1 to 5: Changes animation speed.
 *  6: Activates destruction animation.
 */
export function useEntropy(): Entropy {
  return useContext(EntropyContext)
}

/**
 * Changes entropy level.
 * @see entropyReducer
 * @returns 
 */
export function useEntropyDispatcher(): Dispatch<entropyReducerActions> {
  return useContext(EntropyDispatcherContext)
}

export type entropyReducerActions = 'decrement' | 'destroy' | 'increment' | 'reset'

/**
 * @param {EntropyLevel} entropy
 * Current entropy level
 * @param {'decrement' | 'destroy' | 'increment' | 'reset'} action  
 * Action to be dispatched.
 * Possible actions:
 * - 'increment': Incremenet entropy level.
 * - 'reset': Change entropy level to 0.
 * - 'destroy': Change entropy level to 6.
 * @returns {Entropy} New entropy level
 */
function entropyReducer
  (entropy: Entropy,
    action: entropyReducerActions): Entropy {
  switch (action) {
    case 'decrement':
      if (entropy.value > 0) {
        return { ...entropy, value: (entropy.value - 1 as EntropyLevel) }
      }
      return entropy
    case 'destroy':
      storage.save('entropy', 6)
      return { ...entropy, value: entropy.max as EntropyLevel }
    case 'increment':
      if (entropy.value < entropy.max) {
        return { ...entropy, value: (entropy.value + 1 as EntropyLevel) }
      }
      return entropy
    case 'reset':
      storage.delete('entropy')
      return { ...entropy, refresh: false, value: 0 }
    default:
      console.warn(`Unknown action: ${action}. Returning current entropy value.`)
      return entropy
  }
}

export default useEntropy;