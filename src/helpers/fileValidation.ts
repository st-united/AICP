export interface ValidationResult {
  isValid: boolean;
  errorMessageKey?: string;
  errorMessageParams?: Record<string, any>;
}

export function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSizeMB: number,
): ValidationResult {
  if (!acceptedTypes.includes(file.type)) {
    return {
      isValid: false,
      errorMessageKey: 'VALIDATE.INVALID',
    };
  }
  if (file.size / 1024 / 1024 > maxSizeMB) {
    return {
      isValid: false,
      errorMessageKey: 'VALIDATE.FILE_TOO_LARGE',
      errorMessageParams: { max: maxSizeMB },
    };
  }
  return { isValid: true };
}
