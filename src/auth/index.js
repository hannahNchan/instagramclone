import React from "react"
import { Authenticator } from '@aws-amplify/ui-react';

export default () => {
  const components = {
    Gender() {
      return (
        <SelectField
          label="Gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nb">NB</option>
        </SelectField>
      );
    },
  }

  const formFields = {
    signUp: {
      gender: {
        placeholder: 'Enter your Gender:',
        isRequired: true,
        label: 'Gender',
      },
    },
  }

  <Authenticator.Provider formFields={formFields} components={components}>
    <App />
  </Authenticator.Provider>
};