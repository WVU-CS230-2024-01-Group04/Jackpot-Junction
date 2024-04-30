/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCreateFormInputValues = {
    Username?: string;
    Balance?: number;
    WinsBlackJack?: number;
    LossesBlackJack?: number;
    GamesPlayedBlackjack?: number;
    TotalSpinsSlots?: number;
    TotalSpinsRoullette?: number;
    Pfp?: number;
};
export declare type UserCreateFormValidationValues = {
    Username?: ValidationFunction<string>;
    Balance?: ValidationFunction<number>;
    WinsBlackJack?: ValidationFunction<number>;
    LossesBlackJack?: ValidationFunction<number>;
    GamesPlayedBlackjack?: ValidationFunction<number>;
    TotalSpinsSlots?: ValidationFunction<number>;
    TotalSpinsRoullette?: ValidationFunction<number>;
    Pfp?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
    UserCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Username?: PrimitiveOverrideProps<TextFieldProps>;
    Balance?: PrimitiveOverrideProps<TextFieldProps>;
    WinsBlackJack?: PrimitiveOverrideProps<TextFieldProps>;
    LossesBlackJack?: PrimitiveOverrideProps<TextFieldProps>;
    GamesPlayedBlackjack?: PrimitiveOverrideProps<TextFieldProps>;
    TotalSpinsSlots?: PrimitiveOverrideProps<TextFieldProps>;
    TotalSpinsRoullette?: PrimitiveOverrideProps<TextFieldProps>;
    Pfp?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCreateForm(props: UserCreateFormProps): React.ReactElement;
