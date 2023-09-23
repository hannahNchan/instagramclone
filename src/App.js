import React, { useState } from "react";
import { Authenticator, SelectField } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import MainLayout from "./ui/mainLayout";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { profile } from "./redux/mainSlice";

import "@aws-amplify/ui-react/styles.css";
import UploadPicture from "./components/uploadPicture";

function App() {
  const [identityId, setIdentityId] = useState("");
  const [mainUser, setMainUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onHandleGoToProfile = () => {
    navigate("/profile")
  }

  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => {
        dispatch(profile(user.attributes));
        setMainUser(user.attributes);
        Auth.currentUserCredentials().then(
          (event) => {
            setIdentityId(event.identityId);
          }
        )
        return (
          <main>
            <MainLayout mainUser={mainUser.name} signOut={signOut} handleGoToProfile={onHandleGoToProfile}>
              <>
                <UploadPicture identityId={identityId} mainUser={mainUser.sub} />         
              </>
            </MainLayout>
          </main>
        );
      }}
    </Authenticator>
  );
}

export default App;
