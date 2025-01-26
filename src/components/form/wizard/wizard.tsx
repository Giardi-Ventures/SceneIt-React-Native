import React, {createContext, ReactNode, useCallback, useContext, useState} from "react";

type WizardParams = {
  children: ReactNode;
  onSubmit?: () => void;
}

type WizardContextParams = {
  index: number;
  nextForm: () => void;
}

export const WizardContext = createContext<WizardContextParams>(null);

export function useWizard() {
  return useContext(WizardContext);
}

export function Wizard({children}: WizardParams) {
  const [index, setIndex] = useState<number>(0);
  const nextForm = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  return (
    <WizardContext.Provider value={{nextForm, index}}>
      {children}
    </WizardContext.Provider>
  )
}
