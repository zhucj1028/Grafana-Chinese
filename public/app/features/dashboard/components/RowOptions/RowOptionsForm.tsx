import React, { FC, useCallback, useState } from 'react';
import { Button, Field, Form, HorizontalGroup, Input } from '@grafana/ui';

import { RepeatRowSelect } from '../RepeatRowSelect/RepeatRowSelect';

export type OnRowOptionsUpdate = (title: string | null, repeat: string | null | undefined) => void;

export interface Props {
  title: string | null;
  repeat?: string | null;
  onUpdate: OnRowOptionsUpdate;
  onCancel: () => void;
}

export const RowOptionsForm: FC<Props> = ({ repeat, title, onUpdate, onCancel }) => {
  const [newRepeat, setNewRepeat] = useState<string | null | undefined>(repeat);
  const onChangeRepeat = useCallback((name: string) => setNewRepeat(name), [setNewRepeat]);

  return (
    <Form
      defaultValues={{ title }}
      onSubmit={(formData: { title: string | null }) => {
        onUpdate(formData.title, newRepeat);
      }}
    >
      {({ register }) => (
        <>
          <Field label="标题">
            <Input name="title" ref={register} type="text" />
          </Field>

          <Field label="重复">
            <RepeatRowSelect repeat={newRepeat} onChange={onChangeRepeat} />
          </Field>

          <HorizontalGroup>
            <Button type="submit">更新</Button>
            <Button variant="secondary" onClick={onCancel}>
              取消
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
