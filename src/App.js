import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

import './App.css';

function App({
  values,
  errors,
  touched,
  isSubmitting
}) {
  return (
    <Form>
      {/* html name attr is used by formik to identify the field */}
      {/* built in on change */}
      <div>
         <Field type="email" name="email" placeholder="Email" />
         {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <label>
        Newsletter
        <Field type="checkbox" name="newsletter" checked={values.newsletter}/>
      </label>
      <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

//App is encapsulated by FormikApp (HOC) and all the props passed to App are from formik 
const FormikApp = withFormik({
  //init values
  //you can use external props here
  mapPropsToValues({email, password, newsletter, plan}) {
    return {
      email: email || '',
      password: password ||'',
      newsletter: newsletter || true,
      plan: plan || 'premium'
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Custom not matching email pattern message').required('Custom email required message'),
    password: Yup.string().min(9).required('Custom password required message')
  }),

  //you can pass in a function to check if the form is submitting to dissable the button, or if there are external errors with setErrrors
  handleSubmit(values, { resetForm, setErrors, setSubmitting}){

    //async request mock
    setTimeout(() => {
      //existing email mock
      if(values.email === 'mail@mail.com'){
        //mock api error message
        setErrors({ email: 'That email is already taken'});
      }else{
        //built in form reset
        console.log(values);
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

export default FormikApp;
