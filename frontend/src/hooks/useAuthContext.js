import { AuthContext } from "../components/context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an AuthContextProvider')
  }

  return context
}