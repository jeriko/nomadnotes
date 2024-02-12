'use client';
import React from 'react';
import { Title } from '@mantine/core'
import { Loader } from '@mantine/core';
import { Box, Button, ButtonGroup, FormGroup, Paper, TextField, Typography, styled } from '@mui/material';
import { Formik, FormikErrors } from 'formik';
import Image from 'next/image';

export type LoginDetailsFormValues = {
  email: string;
  password: string;
};

export type LoginAction = {
  title: string;
  onClick: (values: LoginDetailsFormValues) => any;
};

export type LoginDetailsWidgetProps = {
  title: string;
  secondaryActions: LoginAction[];
  onSubmit: (values: LoginDetailsFormValues) => any;
  submitTitle: string;
};

export const LoginDetailsWidget: React.FC<LoginDetailsWidgetProps> = (props) => {
  return (<div>
    <Title>Log in</Title>
    <Formik<LoginDetailsFormValues>
      initialValues={{ email: '', password: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors: FormikErrors<LoginDetailsFormValues> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          await props.onSubmit(values);
        } catch (ex: any) {
          console.error(ex);
          setSubmitting(false);
          setFieldError('password', ex.message);
        }
      }}
    >
      {({ values, errors, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              id="email-input"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="password-input"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={!!errors.password}
              helperText={errors.password}
            />
          </FormGroup>
          <ButtonGroup>
            {props.secondaryActions.map((action) => {
              return (
                <Button
                  key={action.title}
                  variant="text"
                  disabled={isSubmitting}
                  onClick={() => {
                    action.onClick(values);
                  }}
                >
                  {action.title}
                </Button>
              );
            })}
            <Button variant="outlined" type="submit" disabled={isSubmitting}>
              {props.submitTitle}
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  </div>
  );
};
