export enum ModalEnum {
  feedbackModal = 'feedbackModal',
  authModal = 'authModal',
}

// список модалок - список пропсов
export type ModalMap = {
  [ModalEnum.feedbackModal]: null
  [ModalEnum.authModal]: null
}

export type ModalName = keyof ModalMap

export type MountedState =
  | { name: null; props: null }
  | { name: ModalName; props: ModalMap[ModalName] }

export type Ctx = {
  open: <N extends ModalName>(name: N, props?: ModalMap[N]) => void
  close: () => void
  isOpen: boolean
}
