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

type Caos = {
  /** Caos level. If Caos reach maximum level, everything explodes. */
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  /** Maximum level. */
  max: number
}

const caosInit: Caos = {
  value: 0,
  max: 6
}

/** @see useCaos */
let CaosContext: Context<Caos>
/** @see useCaosDispatcher */
let CaosDispatcherContext: Context<Dispatch<caosReducerActions>>

/**
 * Used for easter egg.
 * @see useCaos
 * @see useCaosDispatcher
 */
export function CaosProvider(
  { children }: { children: ReactNode }
): JSX.Element {
  const caosInit: Caos = {
    value: 0,
    max: 6
  }
  
  const [caos, dispatch] = useReducer(caosReducer, caosInit)

  CaosContext = createContext(caosInit)
  CaosDispatcherContext = createContext(dispatch)

  return (
    <CaosContext.Provider value={caos}>
      <CaosDispatcherContext.Provider value={dispatch}>
        {children}
      </CaosDispatcherContext.Provider>
    </CaosContext.Provider>
  )
}

/** 
 *  Used for easter egg.
 *  @returns
 *  Current Caos Level, which varies from 0 to 6.
 *  0: Everything normal.
 *  1 to 5: Changes animation speed.
 *  6: Activates destruction animation.
 */
export function useCaos(): Caos {
  return useContext(CaosContext)
}

/**
 * Changes caos level.
 * @see caosReducer
 * @returns 
 */
export function useCaosDispatcher(): Dispatch<caosReducerActions> {
  return useContext(CaosDispatcherContext)
}

type caosReducerActions = 'increment' | 'reset' | 'destroy'

/**
 * @param {0 | 1 | 2 | 3 | 4 | 5 | 6} caos
 * Current caos level
 * @param {'increment' | 'reset' | 'destroy'} action  
 * Action to be dispatched.
 * Possible actions:
 * - 'increment': Incremenet caos level.
 * - 'reset': Change caos level to 0.
 * - 'destroy': Change caos level to 6.
 * @returns {Caos} New caos level
 */
function caosReducer(caos: Caos, action: caosReducerActions): Caos {
  const updateCaosValue: (value: number) => Caos =
    value => Object.assign({}, caos, {value: value}) 
  switch (action) {
    case 'increment': {
      if (caos.value > caos.max) {
        return updateCaosValue(caos.value)
      }
      return updateCaosValue(caos.value + 1)
    }
    case 'reset': {
      return updateCaosValue(0)
    }
    case 'destroy': {
      return updateCaosValue(caos.max)
    }
    default: {
      console.warn(`Unknown action: ${action}. Returning current caos value.`)
      return caos
    }
  }
}

export default useCaos;