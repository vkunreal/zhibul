import { ModalProvider } from '@app/contexts/ModalContext'
import { RoutesComp } from '@app/routes/RoutesComp'
import { ToastsHost } from '@shared/toasts'

import '@app/toasts/bindToasts'

import './App.scss'

export const App: React.FC = () => {
  return (
    <ModalProvider>
      <RoutesComp />
      <ToastsHost />
    </ModalProvider>
  )
}
