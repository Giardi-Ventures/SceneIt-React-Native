import {Button, ButtonProps} from "../../buttons/button.tsx";
import {useFormikContext} from "formik";

type FormButtonProps = ButtonProps & {

}

export function FormButton(props : FormButtonProps) {
  const formikContext = useFormikContext<any>();

  if (!formikContext) {
    throw new Error("FormButton not within a Form");
  }

  return (
    <Button isLoading={formikContext?.isSubmitting} isDisabled={!formikContext.isValid} onPress={formikContext.handleSubmit} {...props} />
  )
}
