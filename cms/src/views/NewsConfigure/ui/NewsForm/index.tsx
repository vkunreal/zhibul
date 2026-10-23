import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, Button, Stack } from '@mui/material'
import { Controller } from 'react-hook-form'

import { FormTextField, Panel, RichTextEditor, SeoFields } from '@shared/ui'

import { NewsFormProps } from './interfaces'

import s from './styles.module.scss'

export const NewsForm = ({ control, onSubmit, saving }: NewsFormProps) => {
  return (
    <Box component='form' id='news-edit-form' onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        <Panel title='Содержание'>
          <Stack spacing={2.5}>
            <FormTextField
              control={control}
              name='title'
              textFieldProps={{
                label: 'Название',
                autoComplete: 'off',
                fullWidth: true,
              }}
            />
            <Controller
              name='text'
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  label='Текст'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormTextField
              control={control}
              name='shortText'
              textFieldProps={{
                label: 'Короткое описание',
                autoComplete: 'off',
                fullWidth: true,
                multiline: true,
                minRows: 3,
                maxRows: 8,
              }}
            />
          </Stack>
        </Panel>

        <Panel title='SEO'>
          <Stack spacing={2.5}>
            <SeoFields
              control={control}
              titleProps={{ label: 'Title', fullWidth: true }}
              descriptionProps={{
                label: 'Description',
                fullWidth: true,
                multiline: true,
                minRows: 2,
                maxRows: 6,
              }}
              keywordsProps={{ label: 'Keywords', fullWidth: true }}
            />
          </Stack>
        </Panel>

        <Box className={s.actions}>
          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveOutlinedIcon />}
            disabled={saving}
          >
            Сохранить
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
