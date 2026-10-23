import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useId } from 'react'

import { DEFAULT_CANCEL_TEXT, DEFAULT_SUBMIT_TEXT } from './constants'
import { FormModalProps } from './interfaces'

import s from './styles.module.scss'

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  children,
  submitText = DEFAULT_SUBMIT_TEXT,
  cancelText = DEFAULT_CANCEL_TEXT,
  submitDisabled,
  contentClassName = '',
}) => {
  const formId = useId()

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      scroll='paper'
      slotProps={{
        paper: {
          className: s.paper,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        dividers
        className={[s.content, contentClassName].filter(Boolean).join(' ')}
      >
        <form id={formId} className={s.form} onSubmit={onSubmit}>
          {children}
        </form>
      </DialogContent>

      <DialogActions className={s.actions}>
        <Button
          type='submit'
          form={formId}
          variant='outlined'
          color='success'
          disabled={submitDisabled}
        >
          {submitText}
        </Button>

        <Button
          type='button'
          variant='outlined'
          color='error'
          onClick={onClose}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
