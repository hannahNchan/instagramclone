import React, { useEffect, useState } from "react";
import { Authenticator, SelectField, withAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Hub } from "aws-amplify";
import MainLayout from "./ui/mainLayout";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { profile } from "./redux/mainSlice";
import "@aws-amplify/ui-react/styles.css";
import UploadPicture from "./components/uploadPicture";
import listener from './utils/listener';

function App({ signOut, user }) {
  console.log(user)
  const [identityId, setIdentityId] = useState("");
  const [mainUser, setMainUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Hub.listen('auth', listener);
    // dispatch(profile(user.attributes));
    // setMainUser(user.attributes);
    Auth.currentUserCredentials().then(
      (event) => {
        setIdentityId(event.identityId);
      }
    )
  }, []);

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
    <MainLayout mainUser={mainUser.name} signOut={signOut} handleGoToProfile={onHandleGoToProfile}>
      <>
        <UploadPicture identityId={identityId} mainUser={mainUser.sub} />         
      </>
    </MainLayout>
  );
  // return (
  //   <Authenticator formFields={formFields} components={components}>
  //     {({ signOut, user }) => {
  //       Hub.listen('auth', listener);
  //       dispatch(profile(user.attributes));
  //       setMainUser(user.attributes);
  //       Auth.currentUserCredentials().then(
  //         (event) => {
  //           setIdentityId(event.identityId);
  //         }
  //       )
  //     }}
  //   </Authenticator>
  // );
}

export default withAuthenticator(App);
