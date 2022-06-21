import React, { useEffect, useMemo } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { AsyncData } from '~/1st-core';
import { RxjsCrudService } from '../services';

export type RxjsCrudEditFormFieldType = 'text' | 'number';

export type RxjsCrudEditFormField = {
  name: string;
  title?: string;
  type?: RxjsCrudEditFormFieldType;
};

export type RxjsCrudEditFormProps = {
  rxjsCrudService: RxjsCrudService;
  fields: Array<RxjsCrudEditFormField>;
  asyncData?: AsyncData<any>;
  maxWidth?: number;
};

const type2schema: Record<RxjsCrudEditFormFieldType, any> = {
  text: yup.string()
    .trim()
    .required(),
  number: yup.number()
    .required(),
};

const type2input: Record<RxjsCrudEditFormFieldType, (form: UseFormReturn, field: RxjsCrudEditFormField) => React.ReactNode> = {
  // text: (form, field) => (
  //   <TextField
  //     type={field.type}
  //     error={Boolean(form.formState.errors[field.name])}
  //     label={field.title || field.name}
  //     helperText={Boolean(form.formState.errors[field.name]) && form.formState.errors[field.name].message}
  //     onChange={form.register(field.name).onChange}
  //     onBlur={form.register(field.name).onBlur}
  //     name={form.register(field.name).name}
  //     ref={form.register(field.name).ref}
  //     variant={'standard'}
  //   />
  // ),
  text: (form, field) => (
    <Controller
      control={form.control}
      name={field.name}
      render={(a) => (
        <TextField
          type={field.type}
          error={Boolean(a.fieldState.error)}
          label={field.title || field.name}
          helperText={Boolean(a.fieldState.error) && a.fieldState.error.message}
          onChange={a.field.onChange}
          onBlur={a.field.onBlur}
          name={a.field.name}
          ref={a.field.ref}
          value={a.field.value || ''}
          variant={'standard'}
        />
      )}
    />
  ),
  number: (form, field) => (
    <Controller
      control={form.control}
      name={field.name}
      render={(a) => (
        <TextField
          type={field.type}
          error={Boolean(a.fieldState.error)}
          label={field.title || field.name}
          helperText={Boolean(a.fieldState.error) && a.fieldState.error.message}
          onChange={a.field.onChange}
          onBlur={a.field.onBlur}
          name={a.field.name}
          ref={a.field.ref}
          value={a.field.value || ''}
          variant={'standard'}
        />
      )}
    />
  ),
};

export const RxjsCrudEditForm: React.FC<RxjsCrudEditFormProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { maxWidth = 600 } = props;

  const schema = useMemo(() => {
    const record: Record<string, any> = {};

    props.fields.forEach((field) => {
      record[field.name] = type2schema[field.type || 'text'];
    });

    return yup.object(record).required();
  }, [props.fields]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: any) => {
    if (props.asyncData?.data?.id) {
      // console.log('dirty >>>', form.formState.dirtyFields);
      props.rxjsCrudService.cachedUpdate(data, props.asyncData?.data?.id)
        .then((item) => console.log('UPDATED >>>', item))
        .catch((error) => console.log('NOT UPDATED >>>', error));
    } else {
      props.rxjsCrudService.cachedCreate(data)
        .then((item) => console.log('CREATED >>>', item))
        .catch((error) => console.log('NOT CREATED >>>', error));
    }
  };

  useEffect(() => {
    if (props.asyncData?.data) {
      const values: any = {};

      props.fields.forEach((field) => {
        values[field.name] = props.asyncData.data[field.name];
      });

      form.reset(values);
    }
  }, [props.asyncData?.data]);

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          maxWidth,
          px: 4,
          py: 6,
          m: 'auto',
        }}
      >
        <form
          autoComplete={'off'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Stack spacing={6}>
            {props.fields.map((field) => (
              <div key={JSON.stringify(field)}>
                <FormControl fullWidth>
                  {type2input[field.type || 'text'](form, field)}
                </FormControl>
              </div>
            ))}
            <div>
              <Button
                type={'submit'}
                variant={'contained'}
                disabled={!form.formState.isValid || props.asyncData?.loading}
              >
                Save
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
};
