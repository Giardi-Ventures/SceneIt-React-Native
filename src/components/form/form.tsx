import {Formik, FormikErrors, useFormikContext} from "formik";
import React, {useContext} from "react";
import z, {Schema} from "zod";
import {WizardContext} from "./wizard/wizard.tsx";
import {asyncDelay} from "@Giardi-Ventures/SceneIt-Core";
import {Container} from "../container.tsx";

export type FormProps = {
  values: Object;
  onSubmit: (values: any) => Promise<void> | any;
  children: React.ReactNode | React.ReactNode[];
  schema?: Schema | Schema[];
  index?: number;
};

export function Form(props: FormProps) {
  const wizardContext = useContext(WizardContext);
  const {values, onSubmit, children, index, schema = null, ...containerProps} = props;

  if (wizardContext !== null && typeof index !== "undefined") {
    const {index: wizardIndex} = wizardContext;

    if (wizardIndex !== index) {
      return <div />;
    }
  }

  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={values}
      validate={(values): FormikErrors<any> => {
        if (schema === null) {
          return {};
        }

        let schemaArr: Schema[] = null;
        if (!Array.isArray(schema)) {
          schemaArr = [schema];
        } else {
          schemaArr = schema;
        }

        const errors = {};
        let validOverride = false;
        for (let schema of schemaArr) {
          const {success, error} = schema.safeParse(values);

          if (success) {
            // If one schema is valid, then the schema is valid. It's an OR.
            validOverride = true;
          } else {
            for (let detail of error.errors) {
              errors[detail.path.join(".")] = detail.message;
            }
          }
        }

        return validOverride ? {} : errors;
      }}
      onSubmit={async (values) => {
        const submitStart = Date.now();

        await onSubmit(values);
        await asyncDelay(submitStart, 500);
      }}
    >
      {() => {
        return (
          <Container {...containerProps}>
            {children}
          </Container>
        );
      }}
    </Formik>
  );
}

Form.Body = ({children}) => {
  const {handleSubmit} = useFormikContext();

  return <form onSubmit={handleSubmit}>{children}</form>;
};
