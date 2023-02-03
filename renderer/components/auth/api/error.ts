export const signupErrorHandler = (result: string | undefined) => {
  if (result === "auth/invalid-email") {
    return "잘못된 이메일 형식";
  }

  if (result === "auth/email-already-in-use") {
    return "동일한 이메일 주소 존재";
  }

  if (result === "auth/weak-password") {
    return "비밀번호는 6자 이상이여야 합니다.";
  }

  if (result === "password check error") {
    return "비밀번호와 비밀번호 확인이 다릅니다.";
  }

  if (result === "auth/internal-error") {
    return "잘못된 이메일";
  }
  return result;
};

export const loginErrorHandler = (result: string | undefined) => {
  if (result === "auth/user-not-found") {
    return "없는 계정입니다.";
  }

  if (result === "auth/invalid-email") {
    return "잘못된 이메일";
  }

  if (result === "auth/missing-email") {
    return "잘못된 이메일 형식";
  }

  if (result === "auth/wrong-password") {
    return "잘못된 비밀번호";
  }

  if (result === "auth/internal-error") {
    return "비밀번호를 입력해주세요";
  }
};
