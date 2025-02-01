import React, {createContext, useContext, useState, useCallback, ReactNode, FC} from "react";

// Define types for the modal component and its props
export interface ModalProps {
  onClose: () => void;

  [key: string]: any;
}

type ModalComponentType = FC<ModalProps>;

interface ModalItem {
  id: number;
  Component: ModalComponentType;
  props: ModalProps;
}

interface ModalContextType {
  showModal: (Component: ModalComponentType, props?: Omit<ModalProps, "onClose">) => void;
  hideModal: (id: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContainer: FC<{children: ReactNode}> = ({children}) => {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  const showModal = useCallback((Component: ModalComponentType, props: Omit<ModalProps, "onClose"> = {}) => {
    setModalStack((prevStack) => [
      ...prevStack,
      {
        id: Date.now(),
        Component,
        props,
      } as ModalItem,
    ]);
  }, []);

  const hideModal = useCallback((id: number) => {
    setModalStack((prevStack) => prevStack.filter((modal) => modal.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      {modalStack.map((modal) => (
        <modal.Component {...modal.props} onClose={() => hideModal(modal.id)} />
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
