/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type GetPatientCountData = {
  __typename?: "GetPatientCountData";
  doctor_email: Scalars["String"]["output"];
  doctor_id: Scalars["Int"]["output"];
  doctor_name: Scalars["String"]["output"];
  doctor_phone: Scalars["Int"]["output"];
  week_four: Scalars["Int"]["output"];
  week_one: Scalars["Int"]["output"];
  week_three: Scalars["Int"]["output"];
  week_two: Scalars["Int"]["output"];
};

export type GetSimpleChartData = {
  __typename?: "GetSimpleChartData";
  burger: Scalars["Int"]["output"];
  burgerColor: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  donut: Scalars["Int"]["output"];
  donutColor: Scalars["String"]["output"];
  fries: Scalars["Int"]["output"];
  friesColor: Scalars["String"]["output"];
  kebab: Scalars["Int"]["output"];
  kebabColor: Scalars["String"]["output"];
  sandwich: Scalars["Int"]["output"];
  sandwichColor: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  chartData: Array<GetSimpleChartData>;
  patientCountData: Array<GetPatientCountData>;
};

export type GetPatientCountDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetPatientCountDataQuery = {
  __typename?: "Query";
  patientCountData: Array<{
    __typename?: "GetPatientCountData";
    doctor_email: string;
    doctor_id: number;
    doctor_name: string;
    doctor_phone: number;
    week_one: number;
    week_two: number;
    week_three: number;
    week_four: number;
  }>;
};

export type GetSimpleChartDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetSimpleChartDataQuery = {
  __typename?: "Query";
  chartData: Array<{
    __typename?: "GetSimpleChartData";
    country: string;
    burger: number;
    burgerColor: string;
    sandwich: number;
    sandwichColor: string;
    kebab: number;
    kebabColor: string;
    fries: number;
    friesColor: string;
    donut: number;
    donutColor: string;
  }>;
};

export const GetPatientCountDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPatientCountData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "patientCountData" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "doctor_email" },
                },
                { kind: "Field", name: { kind: "Name", value: "doctor_id" } },
                { kind: "Field", name: { kind: "Name", value: "doctor_name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "doctor_phone" },
                },
                { kind: "Field", name: { kind: "Name", value: "week_one" } },
                { kind: "Field", name: { kind: "Name", value: "week_two" } },
                { kind: "Field", name: { kind: "Name", value: "week_three" } },
                { kind: "Field", name: { kind: "Name", value: "week_four" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPatientCountDataQuery,
  GetPatientCountDataQueryVariables
>;
export const GetSimpleChartDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSimpleChartData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "chartData" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "country" } },
                { kind: "Field", name: { kind: "Name", value: "burger" } },
                { kind: "Field", name: { kind: "Name", value: "burgerColor" } },
                { kind: "Field", name: { kind: "Name", value: "sandwich" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sandwichColor" },
                },
                { kind: "Field", name: { kind: "Name", value: "kebab" } },
                { kind: "Field", name: { kind: "Name", value: "kebabColor" } },
                { kind: "Field", name: { kind: "Name", value: "fries" } },
                { kind: "Field", name: { kind: "Name", value: "friesColor" } },
                { kind: "Field", name: { kind: "Name", value: "donut" } },
                { kind: "Field", name: { kind: "Name", value: "donutColor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSimpleChartDataQuery,
  GetSimpleChartDataQueryVariables
>;
