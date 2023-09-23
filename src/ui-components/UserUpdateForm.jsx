/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
export default function UserUpdateForm(props) {
  const {
    userPoolSub: userPoolSubProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userPoolSub: "",
    identityPoolId: "",
    name: "",
    userName: "",
    mail: "",
  };
  const [userPoolSub, setUserPoolSub] = React.useState(
    initialValues.userPoolSub
  );
  const [identityPoolId, setIdentityPoolId] = React.useState(
    initialValues.identityPoolId
  );
  const [name, setName] = React.useState(initialValues.name);
  const [userName, setUserName] = React.useState(initialValues.userName);
  const [mail, setMail] = React.useState(initialValues.mail);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setUserPoolSub(cleanValues.userPoolSub);
    setIdentityPoolId(cleanValues.identityPoolId);
    setName(cleanValues.name);
    setUserName(cleanValues.userName);
    setMail(cleanValues.mail);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = userPoolSubProp
        ? (
            await API.graphql({
              query: getUser,
              variables: { userPoolSub: userPoolSubProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [userPoolSubProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    userPoolSub: [{ type: "Required" }],
    identityPoolId: [],
    name: [],
    userName: [],
    mail: [{ type: "Email" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userPoolSub,
          identityPoolId: identityPoolId ?? null,
          name: name ?? null,
          userName: userName ?? null,
          mail: mail ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateUser,
            variables: {
              input: {
                userPoolSub: userRecord.userPoolSub,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="User pool sub"
        isRequired={true}
        isReadOnly={true}
        value={userPoolSub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userPoolSub: value,
              identityPoolId,
              name,
              userName,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.userPoolSub ?? value;
          }
          if (errors.userPoolSub?.hasError) {
            runValidationTasks("userPoolSub", value);
          }
          setUserPoolSub(value);
        }}
        onBlur={() => runValidationTasks("userPoolSub", userPoolSub)}
        errorMessage={errors.userPoolSub?.errorMessage}
        hasError={errors.userPoolSub?.hasError}
        {...getOverrideProps(overrides, "userPoolSub")}
      ></TextField>
      <TextField
        label="Identity pool id"
        isRequired={false}
        isReadOnly={false}
        value={identityPoolId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userPoolSub,
              identityPoolId: value,
              name,
              userName,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.identityPoolId ?? value;
          }
          if (errors.identityPoolId?.hasError) {
            runValidationTasks("identityPoolId", value);
          }
          setIdentityPoolId(value);
        }}
        onBlur={() => runValidationTasks("identityPoolId", identityPoolId)}
        errorMessage={errors.identityPoolId?.errorMessage}
        hasError={errors.identityPoolId?.hasError}
        {...getOverrideProps(overrides, "identityPoolId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userPoolSub,
              identityPoolId,
              name: value,
              userName,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="User name"
        isRequired={false}
        isReadOnly={false}
        value={userName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userPoolSub,
              identityPoolId,
              name,
              userName: value,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.userName ?? value;
          }
          if (errors.userName?.hasError) {
            runValidationTasks("userName", value);
          }
          setUserName(value);
        }}
        onBlur={() => runValidationTasks("userName", userName)}
        errorMessage={errors.userName?.errorMessage}
        hasError={errors.userName?.hasError}
        {...getOverrideProps(overrides, "userName")}
      ></TextField>
      <TextField
        label="Mail"
        isRequired={false}
        isReadOnly={false}
        value={mail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userPoolSub,
              identityPoolId,
              name,
              userName,
              mail: value,
            };
            const result = onChange(modelFields);
            value = result?.mail ?? value;
          }
          if (errors.mail?.hasError) {
            runValidationTasks("mail", value);
          }
          setMail(value);
        }}
        onBlur={() => runValidationTasks("mail", mail)}
        errorMessage={errors.mail?.errorMessage}
        hasError={errors.mail?.hasError}
        {...getOverrideProps(overrides, "mail")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(userPoolSubProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(userPoolSubProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
