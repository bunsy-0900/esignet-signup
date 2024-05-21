import { useCallback, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageLayout } from "~layouts/PageLayout";
import { isEqual } from "lodash";
import { Form, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

import { Icons } from "~components/ui/icons";
import { Step, StepContent } from "~components/ui/step";
import { useSettings } from "~pages/shared/queries";
import { L2Form, SettingsDto } from "~typings/types";

import BrowserPermissionCheck from "./BrowserPermissionCheck";
import Consent from "./Consent";
import EKYCID from "./EKYCID";
import EKYCInitiation from "./EKYCInitiation";
import EKYCProviderSelection from "./EKYCProviderSelection";
import EKYCVideo from "./EKYCVideo";
import EYKCInstruction from "./EYKCInstruction";
import PostEKYC from "./PostEKYC";
import PreEKYC from "./PreEKYC";
import TermsConditions from "./TermsConditions";
import { L2Step, stepSelector, useL2Store } from "./useL2Store";

interface L2PageContentProps {
  settings: SettingsDto;
}

export const L2FormDefaultValues: L2Form = {};

export const L2Page = () => {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return (
      <PageLayout>
        <Step>
          <StepContent className="flex h-40 items-center justify-center">
            <Icons.loader className="animate-spin text-primary" />
          </StepContent>
        </Step>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <L2PageContent settings={settings} />
    </PageLayout>
  );
};

const L2_VALIDATION_SCHEMA = {
  [L2Step.Consent]: yup.object({}),
  [L2Step.EKYCInstruction]: yup.object({}),
  [L2Step.BrowserPermissionCheck]: yup.object({}),
  [L2Step.EKYCProviderSelection]: yup.object({}),
  [L2Step.TermsConditions]: yup.object({}),
  [L2Step.PreEKYC]: yup.object({}),
  [L2Step.EKYCInitiation]: yup.object({}),
  [L2Step.EKYCVideo]: yup.object({}),
  [L2Step.EKYCID]: yup.object({}),
  [L2Step.PostEKYC]: yup.object({}),
};

const L2PageContent = ({ settings }: L2PageContentProps) => {
  const { step } = useL2Store(
    useCallback((state) => ({ step: stepSelector(state) }), [])
  );

  const l2ValidationSchema = useMemo(
    () => Object.values(L2_VALIDATION_SCHEMA),
    [settings]
  );

  const currentL2ValidationSchema = l2ValidationSchema[step];

  const methods = useForm<L2Form>({
    shouldUnregister: false,
    defaultValues: L2FormDefaultValues,
    resolver: yupResolver(currentL2ValidationSchema) as unknown as Resolver<
      L2Form,
      any
    >,
    mode: "onBlur",
  });

  const {
    getValues,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (isEqual(L2FormDefaultValues, getValues())) return;

    const handleTabBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      return isDirty && (event.returnValue = "L2 Prompt");
    };

    window.addEventListener("beforeunload", handleTabBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleTabBeforeUnload);
    };
  }, [step, getValues()]);

  const getL2Content = (step: L2Step) => {
    switch (step) {
      case L2Step.Consent:
        return <Consent />;
      case L2Step.EKYCInstruction:
        return <EYKCInstruction />;
      case L2Step.BrowserPermissionCheck:
        return <BrowserPermissionCheck />;
      case L2Step.EKYCProviderSelection:
        return <EKYCProviderSelection />;
      case L2Step.TermsConditions:
        return <TermsConditions />;
      case L2Step.PreEKYC:
        return <PreEKYC />;
      case L2Step.EKYCInitiation:
        return <EKYCInitiation />;
      case L2Step.EKYCVideo:
        return <EKYCVideo />;
      case L2Step.EKYCID:
        return <EKYCID />;
      case L2Step.PostEKYC:
        return <PostEKYC />;
      default:
        return "unknown step";
    }
  };

  return (
    <>
      <Form {...methods}>
        <form noValidate>{getL2Content(step)}</form>
      </Form>
    </>
  );
};
