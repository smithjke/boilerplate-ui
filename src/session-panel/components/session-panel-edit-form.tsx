import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import * as yup from 'yup';
import { AsyncData, randomInt } from '~/1st-core';
import { Session } from '~/api';
import { useSessionPanelService } from '~/session-panel';
import { RHFSubmitButton, RHFTextField } from '~/1st-react-ui';

export type SessionPanelEditFormProps = {
  asyncData: AsyncData<Session>;
};

type FormData = {
  ip: string;
  token: string;
};

const schema = yup.object({
  ip: yup.string()
    .trim()
    .required(),
  token: yup.string()
    .trim()
    .required(),
}).required();

export const SessionPanelEditForm: React.FC<SessionPanelEditFormProps> = (props) => {
  const sessionPanelService = useSessionPanelService();

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (props.asyncData.data) {
      const {
        ip,
        token,
      } = props.asyncData.data;
      form.reset({
        ip,
        token,
      });
    }
  }, [form.reset, props.asyncData.data]);

  const save = (data: Session) => {
    if (data.id) {
      const ip = `0.0.0.${randomInt(1, 255)}`;
      console.log('NEW IP >>>', ip);
      sessionPanelService.cachedUpdate({ ip }, data.id)
        .then((result) => console.log('SessionPanelEditForm save result >>>', result))
        .catch((error) => console.log('SessionPanelEditForm save error >>>', error));
    } else {
      // sessionPanelService.cachedCreate(data);
    }
  };

  const onSubmit = (formData: FormData) => {
    if (props.asyncData.data.id) {
      sessionPanelService.cachedUpdate(formData, props.asyncData.data.id)
        .then((result) => console.log('SessionPanelEditForm save result >>>', result))
        .catch((error) => console.log('SessionPanelEditForm save error >>>', error));
    }
  };

  return (
    <div>
      {props.asyncData.loading && (
        <>
          FORM LOADING
        </>
      )}
      {!props.asyncData.loading && props.asyncData.data && (
        <>
          FORM: {JSON.stringify(props.asyncData.data)}
          <Button
            onClick={() => save(props.asyncData.data)}
          >
            Save
          </Button>
          <div>
            <form
              noValidate
              autoComplete={'off'}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Stack spacing={3}>
                <RHFTextField
                  form={form}
                  label={'ip'}
                  name={'ip'}
                />
                <RHFTextField
                  form={form}
                  label={'Token'}
                  name={'token'}
                />
                <RHFSubmitButton
                  form={form}
                  loading={false}
                >
                  Go
                </RHFSubmitButton>
              </Stack>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
