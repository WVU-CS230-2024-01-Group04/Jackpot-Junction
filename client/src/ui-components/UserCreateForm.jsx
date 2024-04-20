/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUser } from "../graphql/mutations";
const client = generateClient();
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Username: "",
    Balance: "",
    Wins: "",
    Losses: "",
  };
  const [Username, setUsername] = React.useState(initialValues.Username);
  const [Balance, setBalance] = React.useState(initialValues.Balance);
  const [Wins, setWins] = React.useState(initialValues.Wins);
  const [Losses, setLosses] = React.useState(initialValues.Losses);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUsername(initialValues.Username);
    setBalance(initialValues.Balance);
    setWins(initialValues.Wins);
    setLosses(initialValues.Losses);
    setErrors({});
  };
  const validations = {
    Username: [{ type: "Required" }],
    Balance: [],
    Wins: [],
    Losses: [],
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
          Username,
          Balance,
          Wins,
          Losses,
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
          await client.graphql({
            query: createUser.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={Username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Username: value,
              Balance,
              Wins,
              Losses,
            };
            const result = onChange(modelFields);
            value = result?.Username ?? value;
          }
          if (errors.Username?.hasError) {
            runValidationTasks("Username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("Username", Username)}
        errorMessage={errors.Username?.errorMessage}
        hasError={errors.Username?.hasError}
        {...getOverrideProps(overrides, "Username")}
      ></TextField>
      <TextField
        label="Balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Balance}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance: value,
              Wins,
              Losses,
            };
            const result = onChange(modelFields);
            value = result?.Balance ?? value;
          }
          if (errors.Balance?.hasError) {
            runValidationTasks("Balance", value);
          }
          setBalance(value);
        }}
        onBlur={() => runValidationTasks("Balance", Balance)}
        errorMessage={errors.Balance?.errorMessage}
        hasError={errors.Balance?.hasError}
        {...getOverrideProps(overrides, "Balance")}
      ></TextField>
      <TextField
        label="Wins"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Wins}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              Wins: value,
              Losses,
            };
            const result = onChange(modelFields);
            value = result?.Wins ?? value;
          }
          if (errors.Wins?.hasError) {
            runValidationTasks("Wins", value);
          }
          setWins(value);
        }}
        onBlur={() => runValidationTasks("Wins", Wins)}
        errorMessage={errors.Wins?.errorMessage}
        hasError={errors.Wins?.hasError}
        {...getOverrideProps(overrides, "Wins")}
      ></TextField>
      <TextField
        label="Losses"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Losses}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              Wins,
              Losses: value,
            };
            const result = onChange(modelFields);
            value = result?.Losses ?? value;
          }
          if (errors.Losses?.hasError) {
            runValidationTasks("Losses", value);
          }
          setLosses(value);
        }}
        onBlur={() => runValidationTasks("Losses", Losses)}
        errorMessage={errors.Losses?.errorMessage}
        hasError={errors.Losses?.hasError}
        {...getOverrideProps(overrides, "Losses")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
