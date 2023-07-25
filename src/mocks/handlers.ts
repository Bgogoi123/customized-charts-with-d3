import { graphql } from "msw";
import { NIVO_BARCHART_DATA, PATIENT_COUNT_PER_DOCTOR } from "../utils/data";

export const handlers = [
  // rest.get("/patient-count", (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(PATIENT_COUNT_PER_DOCTOR));
  // }),

  graphql.query("GetPatientCountData", (_, res, ctx) => {
    return res(ctx.data({ patientCountData: PATIENT_COUNT_PER_DOCTOR }));
  }),

  graphql.query("GetSimpleChartData", (_, res, ctx) => {
    return res(ctx.data({ chartData: NIVO_BARCHART_DATA }));
  }),
];
