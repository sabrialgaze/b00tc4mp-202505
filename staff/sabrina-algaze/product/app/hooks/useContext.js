import { useContext as useContextReact } from 'react'

import { Context } from '../Context'

export const useContext = () => {
    return useContextReact(Context)
}