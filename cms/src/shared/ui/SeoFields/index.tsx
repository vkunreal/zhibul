import { FieldPath, FieldValues } from 'react-hook-form'

import { FormTextField } from '../FormTextField'

import { SeoFieldsProps, SeoValues } from './interfaces'

export function SeoFields<T extends FieldValues & SeoValues>({
  control,
  titleProps,
  descriptionProps,
  keywordsProps,
}: SeoFieldsProps<T>) {
  return (
    <>
      <FormTextField
        control={control}
        name={'seoTitle' as FieldPath<T>}
        textFieldProps={{
          label: 'SEO Title',
          autoComplete: 'off',
          ...titleProps,
        }}
      />
      <FormTextField
        control={control}
        name={'seoDescription' as FieldPath<T>}
        textFieldProps={{
          label: 'SEO Description',
          autoComplete: 'off',
          ...descriptionProps,
        }}
      />
      <FormTextField
        control={control}
        name={'seoKeywords' as FieldPath<T>}
        textFieldProps={{
          label: 'SEO Keywords',
          autoComplete: 'off',
          ...keywordsProps,
        }}
      />
    </>
  )
}
