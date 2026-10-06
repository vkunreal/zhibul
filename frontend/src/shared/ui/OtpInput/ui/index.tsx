'use client'

import { TextField } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'

import { OtpInputProps } from '../interfaces'
import {
  getCells,
  handleDigitChange,
  handleDigitKey,
  handleDigitPaste,
} from '../lib'
import s from './styles.module.scss'

export const OtpInput: FC<OtpInputProps> = ({
  length,
  control,
  onSubmit,
}) => {
  const inputs = useRef<HTMLInputElement[]>([])

  const focusDigit = (index: number) => {
    const input = inputs.current[index]

    input.focus()
    input.select()
  }

  useEffect(() => {
    focusDigit(0)
  }, [])

  return (
    <>
      <Controller
        name="code"
        control={control}
        rules={{
          required: 'Введите код из SMS',
          validate: (value: string) =>
            value.replace(/\s/g, '').length === length ||
            `Код состоит из ${length} цифр`,
        }}
        render={({ field, fieldState }) => {
          const cells = getCells(field.value, length)

          return (
            <div>
              <div className={s.digits}>
                {cells.map((cell, index) => (
                  <TextField
                    key={`char_${index}`}
                    className={s.digit}
                    variant="outlined"
                    value={cell.trim()}
                    error={!!fieldState.error}
                    inputRef={(node) => {
                      inputs.current[index] = node
                    }}
                    onChange={(e) => {
                      handleDigitChange(
                        e.target.value,
                        field.value,
                        cells,
                        index,
                        length,
                        field.onChange,
                        focusDigit,
                      )
                    }}
                    onKeyDown={(e) => {
                      const handled = handleDigitKey(
                        e.key,
                        cells,
                        index,
                        length,
                        field.onChange,
                        focusDigit,
                        onSubmit,
                      )

                      if (handled) e.preventDefault()
                    }}
                    onPaste={(event) => {
                      event.preventDefault()
                      handleDigitPaste(
                        event.clipboardData.getData('text'),
                        field.value,
                        index,
                        length,
                        field.onChange,
                        focusDigit,
                      )
                    }}
                    slotProps={{
                      htmlInput: {
                        inputMode: 'numeric',
                        autoComplete: index === 0 ? 'one-time-code' : 'off',
                        'aria-label': `Цифра ${index + 1} из ${length}`,
                      },
                    }}
                  />
                ))}
              </div>

              {fieldState.error?.message && (
                <p className={s.error}>{fieldState.error.message}</p>
              )}
            </div>
          )
        }}
      />
    </>
  )
}
