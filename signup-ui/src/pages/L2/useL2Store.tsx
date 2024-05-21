import { isEqual } from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Steps are listed orderly
export enum L2Step {
  Consent,
  EKYCInstruction,
  BrowserPermissionCheck,
  EKYCProviderSelection,
  TermsConditions,
  PreEKYC,
  EKYCInitiation,
  EKYCVideo,
  EKYCID,
  PostEKYC,
}

export type L2Store = {
  step: L2Step;
  setStep: (step: L2Step) => void;
};

export const useL2Store = create<L2Store>()(
  devtools((set, get) => ({
    step: L2Step.Consent,
    setStep: (step: L2Step) => {
      const current = get();
      if (isEqual(current.step, step)) return;
      set((state) => ({ step }));
    },
  }))
);

export const stepSelector = (state: L2Store): L2Store["step"] => state.step;

export const setStepSelector = (state: L2Store): L2Store["setStep"] =>
  state.setStep;
