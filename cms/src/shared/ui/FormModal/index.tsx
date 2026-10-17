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
          sx: { maxHeight: '90vh' },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        dividers
        className={`d-flex flex-column g-3 ${contentClassName}`}
      >
        <form
          id={formId}
          className='d-flex flex-column g-3'
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
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
