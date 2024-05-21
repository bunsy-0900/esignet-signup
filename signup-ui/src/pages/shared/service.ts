import { ApiService } from "~services/api.service";
import {
  GenerateChallengeRequestDto,
  RegistrationRequestDto,
  RegistrationStatusResponseDto,
  RegistrationWithFailedStatus,
  ResetPasswordRequestDto,
  SettingsDto,
  TermsAndConditionDto,
  VerifyChallengeRequestDto,
} from "~typings/types";

export const getSettings = async (): Promise<SettingsDto> => {
  return ApiService.get<SettingsDto>("/settings").then(({ data }) => data);
};

export const generateChallenge = async (
  generateChallenge: GenerateChallengeRequestDto
) => {
  return ApiService.post(
    "/registration/generate-challenge",
    generateChallenge
  ).then(({ data }) => data);
};

export const verifyChallenge = async (
  verifyChallenge: VerifyChallengeRequestDto
) => {
  return ApiService.post(
    "/registration/verify-challenge",
    verifyChallenge
  ).then(({ data }) => data);
};

export const register = async (
  register: RegistrationRequestDto
) => {
  return ApiService.post("/registration/register", register).then(({ data }) => data);
};

export const getRegistrationStatus =
  async (): Promise<RegistrationStatusResponseDto> => {
    return ApiService.get<RegistrationStatusResponseDto>(
      "/registration/status"
    ).then(({ data }) => {
      // treat PENDING as an error so that react-query will auto retry
      if (data.response?.status === RegistrationWithFailedStatus.PENDING) {
        throw new Error("Status pending");
      }

      return data;
    });
  };

export const resetPassword = async (
  newUserInfo: ResetPasswordRequestDto
) => {
  return ApiService.post("/reset-password", newUserInfo).then(({ data }) => data);
};

// TODO: remove when the real endpoint is available
// currently a mock endpoint
export const getTermsAndConditions =
  async (): Promise<TermsAndConditionDto> => {
    return ApiService.get(`/ekyc-verify/tnc`).then(({ data }) => data);
  };

export const getSlotAvailability = async () => {
  return ApiService.get("slot-availability").then(({ data }) => data);
};
