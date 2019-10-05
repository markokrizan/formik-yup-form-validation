import React from 'react';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './App.css';

function App({}) {

  const initialValues = {
    email: '',
    password: '',
    newsletter: true,
    plan: 'premium'
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Custom not matching email pattern message').required('Custom email required message'),
    password: Yup.string().min(9).required('Custom password required message')
  });

  const handleSubmit = (values, { resetForm, setErrors, setSubmitting}) => {
    setTimeout(() => {
      if(values.email === 'mail@mail.com'){
        setErrors({ email: 'That email is already taken'});
      }else{
        console.log(values);
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema = {validationSchema}
      onSubmit={handleSubmit}
    >
     {({
       values,
       isSubmitting
      }) =>
      (<Form>
        <div>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" />
        </div>
        <label>
          Newsletter
          <Field type="checkbox" name="newsletter" checked={values.newsletter} />
        </label>
        <Field component="select" name="plan">
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </Field>
        <button disabled={isSubmitting}>Submit</button>
      </Form>)}
    </Formik>
  );
}

export default App;
