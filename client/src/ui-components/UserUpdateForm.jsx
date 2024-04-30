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
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
const client = generateClient();
export default function UserUpdateForm(props) {
  const {
    id: idProp,
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
    Username: "",
    Balance: "",
    WinsBlackJack: "",
    LossesBlackJack: "",
    GamesPlayedBlackjack: "",
    TotalSpinsSlots: "",
    TotalSpinsRoullette: "",
    Pfp: "",
  };
  const [Username, setUsername] = React.useState(initialValues.Username);
  const [Balance, setBalance] = React.useState(initialValues.Balance);
  const [WinsBlackJack, setWinsBlackJack] = React.useState(
    initialValues.WinsBlackJack
  );
  const [LossesBlackJack, setLossesBlackJack] = React.useState(
    initialValues.LossesBlackJack
  );
  const [GamesPlayedBlackjack, setGamesPlayedBlackjack] = React.useState(
    initialValues.GamesPlayedBlackjack
  );
  const [TotalSpinsSlots, setTotalSpinsSlots] = React.useState(
    initialValues.TotalSpinsSlots
  );
  const [TotalSpinsRoullette, setTotalSpinsRoullette] = React.useState(
    initialValues.TotalSpinsRoullette
  );
  const [Pfp, setPfp] = React.useState(initialValues.Pfp);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setUsername(cleanValues.Username);
    setBalance(cleanValues.Balance);
    setWinsBlackJack(cleanValues.WinsBlackJack);
    setLossesBlackJack(cleanValues.LossesBlackJack);
    setGamesPlayedBlackjack(cleanValues.GamesPlayedBlackjack);
    setTotalSpinsSlots(cleanValues.TotalSpinsSlots);
    setTotalSpinsRoullette(cleanValues.TotalSpinsRoullette);
    setPfp(cleanValues.Pfp);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    Username: [{ type: "Required" }],
    Balance: [],
    WinsBlackJack: [],
    LossesBlackJack: [],
    GamesPlayedBlackjack: [],
    TotalSpinsSlots: [],
    TotalSpinsRoullette: [],
    Pfp: [],
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
          Balance: Balance ?? null,
          WinsBlackJack: WinsBlackJack ?? null,
          LossesBlackJack: LossesBlackJack ?? null,
          GamesPlayedBlackjack: GamesPlayedBlackjack ?? null,
          TotalSpinsSlots: TotalSpinsSlots ?? null,
          TotalSpinsRoullette: TotalSpinsRoullette ?? null,
          Pfp: Pfp ?? null,
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
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
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
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp,
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
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp,
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
        label="Wins black jack"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={WinsBlackJack}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack: value,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp,
            };
            const result = onChange(modelFields);
            value = result?.WinsBlackJack ?? value;
          }
          if (errors.WinsBlackJack?.hasError) {
            runValidationTasks("WinsBlackJack", value);
          }
          setWinsBlackJack(value);
        }}
        onBlur={() => runValidationTasks("WinsBlackJack", WinsBlackJack)}
        errorMessage={errors.WinsBlackJack?.errorMessage}
        hasError={errors.WinsBlackJack?.hasError}
        {...getOverrideProps(overrides, "WinsBlackJack")}
      ></TextField>
      <TextField
        label="Losses black jack"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={LossesBlackJack}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack,
              LossesBlackJack: value,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp,
            };
            const result = onChange(modelFields);
            value = result?.LossesBlackJack ?? value;
          }
          if (errors.LossesBlackJack?.hasError) {
            runValidationTasks("LossesBlackJack", value);
          }
          setLossesBlackJack(value);
        }}
        onBlur={() => runValidationTasks("LossesBlackJack", LossesBlackJack)}
        errorMessage={errors.LossesBlackJack?.errorMessage}
        hasError={errors.LossesBlackJack?.hasError}
        {...getOverrideProps(overrides, "LossesBlackJack")}
      ></TextField>
      <TextField
        label="Games played blackjack"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={GamesPlayedBlackjack}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack: value,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp,
            };
            const result = onChange(modelFields);
            value = result?.GamesPlayedBlackjack ?? value;
          }
          if (errors.GamesPlayedBlackjack?.hasError) {
            runValidationTasks("GamesPlayedBlackjack", value);
          }
          setGamesPlayedBlackjack(value);
        }}
        onBlur={() =>
          runValidationTasks("GamesPlayedBlackjack", GamesPlayedBlackjack)
        }
        errorMessage={errors.GamesPlayedBlackjack?.errorMessage}
        hasError={errors.GamesPlayedBlackjack?.hasError}
        {...getOverrideProps(overrides, "GamesPlayedBlackjack")}
      ></TextField>
      <TextField
        label="Total spins slots"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TotalSpinsSlots}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots: value,
              TotalSpinsRoullette,
              Pfp,
            };
            const result = onChange(modelFields);
            value = result?.TotalSpinsSlots ?? value;
          }
          if (errors.TotalSpinsSlots?.hasError) {
            runValidationTasks("TotalSpinsSlots", value);
          }
          setTotalSpinsSlots(value);
        }}
        onBlur={() => runValidationTasks("TotalSpinsSlots", TotalSpinsSlots)}
        errorMessage={errors.TotalSpinsSlots?.errorMessage}
        hasError={errors.TotalSpinsSlots?.hasError}
        {...getOverrideProps(overrides, "TotalSpinsSlots")}
      ></TextField>
      <TextField
        label="Total spins roullette"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TotalSpinsRoullette}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette: value,
              Pfp,
            };
            const result = onChange(modelFields);
            value = result?.TotalSpinsRoullette ?? value;
          }
          if (errors.TotalSpinsRoullette?.hasError) {
            runValidationTasks("TotalSpinsRoullette", value);
          }
          setTotalSpinsRoullette(value);
        }}
        onBlur={() =>
          runValidationTasks("TotalSpinsRoullette", TotalSpinsRoullette)
        }
        errorMessage={errors.TotalSpinsRoullette?.errorMessage}
        hasError={errors.TotalSpinsRoullette?.hasError}
        {...getOverrideProps(overrides, "TotalSpinsRoullette")}
      ></TextField>
      <TextField
        label="Pfp"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Pfp}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Username,
              Balance,
              WinsBlackJack,
              LossesBlackJack,
              GamesPlayedBlackjack,
              TotalSpinsSlots,
              TotalSpinsRoullette,
              Pfp: value,
            };
            const result = onChange(modelFields);
            value = result?.Pfp ?? value;
          }
          if (errors.Pfp?.hasError) {
            runValidationTasks("Pfp", value);
          }
          setPfp(value);
        }}
        onBlur={() => runValidationTasks("Pfp", Pfp)}
        errorMessage={errors.Pfp?.errorMessage}
        hasError={errors.Pfp?.hasError}
        {...getOverrideProps(overrides, "Pfp")}
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
          isDisabled={!(idProp || userModelProp)}
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
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
