import { TextField } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"
import { Controller, FieldError, useController, useForm } from "react-hook-form"

export function TextFieldLite({ control, name, label, type }: {
  control: any // Substitua pelo tipo adequado
  name: string
  label: string
  type?: HTMLInputTypeAttribute | 'text'
}) {


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        <TextField
          {...field} // send down the input name
          margin='normal'
          fullWidth
          label={label}

          type={type}
          error={Boolean(error)}

          helperText={error?.message}
        />
      }
    />
  )
}