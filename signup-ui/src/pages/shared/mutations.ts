import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { alpha2ToAlpha3T } from "@cospired/i18n-iso-languages"

import { ApiError } from "~typings/core";
import {
  GenerateChallengeRequestDto,
  GenerateChallengeResponseDto,
  RegistrationRequestDto,
  RegistrationResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  SlotAvailabilityRequestDto,
  SlotAvailabilityResponseDto,
  VerifyChallengeRequestDto,
  VerifyChallengeResponseDto,
  UpdateProcessRequestDto,
  UpdateProcessResponseDto
} from "~typings/types";

import {
  checkSlotAvailability,
  generateChallenge,
  register,
  resetPassword,
  verifyChallenge,
  updateProcess
} from "./service";

export const keys = {
  challengeGeneration: ["challengeGeneration"] as const,
  challengeVerification: ["challengeVerification"] as const,
  registration: ["registration"] as const,
  resetPassword: ["resetPassword"] as const,
  slotAvailability: ["slotAvailability" as const],
  updateProcess: ["updateProcess"] as const,
};

export const useGenerateChallenge = () => {
  const generateChallengeMutation = useMutation<
    GenerateChallengeResponseDto,
    ApiError,
    GenerateChallengeRequestDto
  >({
    mutationKey: keys.challengeGeneration,
    mutationFn: (generateChallengeRequestDto: GenerateChallengeRequestDto) =>
      generateChallenge(generateChallengeRequestDto),
  });

  return { generateChallengeMutation };
};

export const useVerifyChallenge = () => {
  const verifyChallengeMutation = useMutation<
    VerifyChallengeResponseDto,
    ApiError,
    VerifyChallengeRequestDto
  >({
    mutationKey: keys.challengeVerification,
    mutationFn: (verifyChallengeRequestDto: VerifyChallengeRequestDto) =>
      verifyChallenge(verifyChallengeRequestDto),
  });

  return { verifyChallengeMutation };
};

export const useRegister = () => {
  const { i18n } = useTranslation();
  const locale = alpha2ToAlpha3T(i18n.language) ?? "khm";

  const registerMutation = useMutation<
    RegistrationResponseDto,
    ApiError,
    RegistrationRequestDto
  >({
    mutationKey: keys.registration,
    mutationFn: (registrationRequestDto: RegistrationRequestDto) => {
      registrationRequestDto.request.locale = locale
      return register(registrationRequestDto)
    },
    gcTime: Infinity,
  });

  return { registerMutation };
};

export const useResetPassword = () => {
  const { i18n } = useTranslation();
  const locale = alpha2ToAlpha3T(i18n.language) ?? "khm";

  const resetPasswordMutation = useMutation<
    ResetPasswordResponseDto,
    ApiError,
    ResetPasswordRequestDto
  >({
    mutationKey: keys.resetPassword,
    mutationFn: (resetPasswordRequestDto: ResetPasswordRequestDto) => {
      resetPasswordRequestDto.request.locale = locale
      return resetPassword(resetPasswordRequestDto)
    },
    gcTime: Infinity,
  });

  return { resetPasswordMutation };
};

export const useSlotAvailability = () => {
  const slotAvailabilityMutation = useMutation<
    SlotAvailabilityResponseDto,
    ApiError,
    SlotAvailabilityRequestDto
  >({
    mutationKey: keys.slotAvailability,
    mutationFn: (slotAvailabilityRequestDto: SlotAvailabilityRequestDto) => {
      return checkSlotAvailability(slotAvailabilityRequestDto);
    },
  });

  return { slotAvailabilityMutation };
};

export const useUpdateProcess = () => {
  const updateProcessMutation = useMutation<
    UpdateProcessResponseDto,
    ApiError,
    UpdateProcessRequestDto
  >({
    mutationKey: keys.updateProcess,
    mutationFn: (updateProcessRequestDto: UpdateProcessRequestDto) => {
      return updateProcess(updateProcessRequestDto)
    },
    gcTime: Infinity,
  });

  return { updateProcessMutation };
};
