import React, { useState } from 'react';

import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { withStoryContainer } from '../../utils/storybook/withStoryContainer';
import mdx from './Form.mdx';
import { ValidateResult } from 'react-hook-form';
import { boolean } from '@storybook/addon-knobs';
import {
  Field,
  Legend,
  Input,
  Button,
  Form,
  Switch,
  Checkbox,
  Select,
  InputControl,
  TextArea,
  RadioButtonGroup,
} from '@grafana/ui';

export default {
  title: 'Forms/Example forms',
  decorators: [withStoryContainer, withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const selectOptions = [
  {
    label: '选项1',
    value: 'option1',
  },
  {
    label: '选项2',
    value: 'option2',
  },
  {
    label: '选项3',
    value: 'option3',
  },
];

interface FormDTO {
  name: string;
  email: string;
  username: string;
  checkbox: boolean;
  switch: boolean;
  radio: string;
  select: string;
  text: string;
  nested: {
    path: string;
  };
}

const renderForm = (defaultValues?: Partial<FormDTO>) => (
  <Form
    defaultValues={defaultValues}
    onSubmit={(data: FormDTO) => {
      console.log(data);
    }}
  >
    {({ register, control, errors }) =>
      (console.log(errors) as any) || (
        <>
          <Legend>Edit user</Legend>

          <Field label="名字" invalid={!!errors.name} error="名称为必填项">
            <Input name="name" placeholder="Roger Waters" ref={register({ required: true })} />
          </Field>

          <Field label="邮箱" invalid={!!errors.email} error="邮箱为必填项">
            <Input id="email" name="email" placeholder="roger.waters@grafana.com" ref={register({ required: true })} />
          </Field>

          <Field label="用户名">
            <Input name="username" placeholder="mr.waters" ref={register} />
          </Field>
          <Field label="嵌套对象">
            <Input name="nested.path" placeholder="嵌套路径" ref={register} />
          </Field>

          <Field label="文字域" invalid={!!errors.text} error="文字为必填项">
            <TextArea name="text" placeholder="一段文字" ref={register({ required: true })} />
          </Field>

          <Field label="复选框" invalid={!!errors.checkbox} error="我们需要您的同意">
            <Checkbox name="checkbox" label="你同意吗" ref={register({ required: true })} />
          </Field>

          <Field label="开关">
            <Switch name="switch" ref={register} />
          </Field>

          <Field label="单选按钮">
            <InputControl name="radio" control={control} options={selectOptions} as={RadioButtonGroup} />
          </Field>

          <Field label="选择" invalid={!!errors.select} error="需要选择">
            <InputControl
              name="select"
              control={control}
              rules={{
                required: true,
              }}
              options={selectOptions}
              as={Select}
            />
          </Field>

          <Button type="submit">更新</Button>
        </>
      )
    }
  </Form>
);

export const basic = () => {
  return <>{renderForm()}</>;
};

export const defaultValues = () => {
  const defaultValues = [
    {
      name: 'Roger Waters',
      nested: {
        path: 'Nested path default value',
      },
      radio: 'option2',
      select: 'option1',
      switch: true,
    },
    {
      name: 'John Waters',
      nested: {
        path: 'Nested path default value updated',
      },
      radio: 'option1',
      select: 'option2',
      switch: false,
    },
  ];
  const [defaultsIdx, setDefaultsIdx] = useState(0);

  return (
    <>
      {renderForm(defaultValues[defaultsIdx])}
      <Button
        onClick={() => {
          setDefaultsIdx(s => (s + 1) % 2);
        }}
        variant="secondary"
      >
        Change default values
      </Button>
    </>
  );
};

export const asyncValidation = () => {
  const passAsyncValidation = boolean('Pass username validation', true);
  return (
    <>
      <Form
        onSubmit={(data: FormDTO) => {
          alert('Submitted successfully!');
        }}
      >
        {({ register, control, errors, formState }) =>
          (console.log(errors) as any) || (
            <>
              <Legend>Edit user</Legend>

              <Field label="Name" invalid={!!errors.name} error="Username is already taken">
                <Input
                  name="name"
                  placeholder="Roger Waters"
                  ref={register({ validate: validateAsync(passAsyncValidation) })}
                />
              </Field>

              <Button type="submit" disabled={formState.isSubmitting}>
                提交
              </Button>
            </>
          )
        }
      </Form>
    </>
  );
};

const validateAsync = (shouldPass: boolean) => async () => {
  try {
    await new Promise<ValidateResult>((resolve, reject) => {
      setTimeout(() => {
        if (shouldPass) {
          resolve();
        } else {
          reject('出了些问题...');
        }
      }, 2000);
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
