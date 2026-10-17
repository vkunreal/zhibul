import { RoutesComp } from '@app/RoutesComp'
import { ToastsHost } from '@shared/toasts'

import '@app/bindToasts'

import './App.scss'

export const App: React.FC = () => {
  return (
    <>
      <RoutesComp />
      <ToastsHost />
    </>
  )
}
