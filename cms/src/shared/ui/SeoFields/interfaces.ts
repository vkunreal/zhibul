import { TextFieldProps } from '@mui/material'
import { Control, FieldValues } from 'react-hook-form'

export interface SeoValues {
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export interface SeoFieldsProps<T extends FieldValues & SeoValues> {
  control: Control<T, unknown, T>
  titleProps?: TextFieldProps
  descriptionProps?: TextFieldProps
  keywordsProps?: TextFieldProps
}
