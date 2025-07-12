import bcrypt from 'bcryptjs';

/**
 * Password validation rule interface
 */
export interface PasswordValidationRule {
  id: string;
  message: string;
  isValid: boolean;
  test: (password: string) => boolean;
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  rules: PasswordValidationRule[];
}

/**
 * Password strength levels
 */
export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong',
}

/**
 * Password validation configuration
 */
export interface PasswordValidationConfig {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  maxLength?: number;
  forbiddenPatterns?: string[];
}

/**
 * Default password validation configuration
 */
export const DEFAULT_PASSWORD_CONFIG: PasswordValidationConfig = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  maxLength: 128,
  forbiddenPatterns: ['password', '12345', 'qwerty', 'admin'],
};

/**
 * Create password validation rules based on configuration
 * @param config - Password validation configuration
 * @returns Array of password validation rules
 */
export const createPasswordValidationRules = (
  config: PasswordValidationConfig = DEFAULT_PASSWORD_CONFIG
): PasswordValidationRule[] => {
  const rules: PasswordValidationRule[] = [];

  // Minimum length rule
  rules.push({
    id: 'minLength',
    message: `Password must be at least ${config.minLength} characters long`,
    isValid: false,
    test: (password: string) => password.length >= config.minLength,
  });

  // Maximum length rule
  if (config.maxLength) {
    rules.push({
      id: 'maxLength',
      message: `Password must be less than ${config.maxLength} characters long`,
      isValid: false,
      test: (password: string) => (config.maxLength ? password.length <= config.maxLength : true),
    });
  }

  // Uppercase letter rule
  if (config.requireUppercase) {
    rules.push({
      id: 'uppercase',
      message: 'Password must contain at least one uppercase letter (A-Z)',
      isValid: false,
      test: (password: string) => /[A-Z]/.test(password),
    });
  }

  // Lowercase letter rule
  if (config.requireLowercase) {
    rules.push({
      id: 'lowercase',
      message: 'Password must contain at least one lowercase letter (a-z)',
      isValid: false,
      test: (password: string) => /[a-z]/.test(password),
    });
  }

  // Number rule
  if (config.requireNumbers) {
    rules.push({
      id: 'numbers',
      message: 'Password must contain at least one number (0-9)',
      isValid: false,
      test: (password: string) => /[0-9]/.test(password),
    });
  }

  // Symbol rule
  if (config.requireSymbols) {
    rules.push({
      id: 'symbols',
      message: 'Password must contain at least one symbol (!@#$%^&*)',
      isValid: false,
      test: (password: string) => /[!@#$%^&*(),.?":{}|<>\-_=+]/.test(password),
    });
  }

  // Forbidden patterns rule
  if (config.forbiddenPatterns && config.forbiddenPatterns.length > 0) {
    rules.push({
      id: 'forbiddenPatterns',
      message: 'Password cannot contain common patterns (password, 12345, etc.)',
      isValid: false,
      test: (password: string) => {
        const lowerPassword = password.toLowerCase();
        return !config.forbiddenPatterns!.some((pattern) =>
          lowerPassword.includes(pattern.toLowerCase())
        );
      },
    });
  }

  return rules;
};

/**
 * Validate password against rules
 * @param password - Password to validate
 * @param config - Password validation configuration
 * @returns Password validation result
 */
export const validatePassword = (
  password: string,
  config: PasswordValidationConfig = DEFAULT_PASSWORD_CONFIG
): PasswordValidationResult => {
  const rules = createPasswordValidationRules(config);

  // Test each rule against the password
  const validatedRules = rules.map((rule) => ({
    ...rule,
    isValid: rule.test(password),
  }));

  // Get failed rules
  const failedRules = validatedRules.filter((rule) => !rule.isValid);
  const errors = failedRules.map((rule) => rule.message);

  return {
    isValid: errors.length === 0,
    errors,
    rules: validatedRules,
  };
};

/**
 * Get password strength based on validation rules
 * @param password - Password to analyze
 * @param config - Password validation configuration
 * @returns Password strength level
 */
export const getPasswordStrength = (
  password: string,
  config: PasswordValidationConfig = DEFAULT_PASSWORD_CONFIG
): PasswordStrength => {
  const { rules } = validatePassword(password, config);
  const validRulesCount = rules.filter((rule) => rule.isValid).length;
  const totalRulesCount = rules.length;
  const percentage = (validRulesCount / totalRulesCount) * 100;

  if (percentage < 40) return PasswordStrength.WEAK;
  if (percentage < 70) return PasswordStrength.MEDIUM;
  if (percentage < 100) return PasswordStrength.STRONG;
  return PasswordStrength.VERY_STRONG;
};

/**
 * Get password strength color for UI
 * @param strength - Password strength level
 * @returns Color class or hex code
 */
export const getPasswordStrengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case PasswordStrength.WEAK:
      return 'text-red-500';
    case PasswordStrength.MEDIUM:
      return 'text-yellow-500';
    case PasswordStrength.STRONG:
      return 'text-blue-500';
    case PasswordStrength.VERY_STRONG:
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

/**
 * Get password strength background color for progress bar
 * @param strength - Password strength level
 * @returns Background color class
 */
export const getPasswordStrengthBgColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case PasswordStrength.WEAK:
      return 'bg-red-500';
    case PasswordStrength.MEDIUM:
      return 'bg-yellow-500';
    case PasswordStrength.STRONG:
      return 'bg-blue-500';
    case PasswordStrength.VERY_STRONG:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // Higher number = more secure but slower
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verify a password against a hash
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns Promise<boolean> - True if password matches
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a random salt (optional utility)
 * @param rounds - Salt rounds (default: 12)
 * @returns Promise<string> - Generated salt
 */
export const generateSalt = async (rounds: number = 12): Promise<string> => {
  return await bcrypt.genSalt(rounds);
};

/**
 * Hash password synchronously (use with caution in production)
 * @param password - Plain text password
 * @returns string - Hashed password
 */
export const hashPasswordSync = (password: string): string => {
  const saltRounds = 12;
  return bcrypt.hashSync(password, saltRounds);
};

/**
 * Verify password synchronously (use with caution in production)
 * @param password - Plain text password
 * @param hashedPassword - Hashed password
 * @returns boolean - True if password matches
 */
export const verifyPasswordSync = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
