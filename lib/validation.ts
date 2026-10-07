export type DemoRequest = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

export const LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  role: 100,
  message: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Shared by the client form and the route handler. */
export function validateDemoRequest(input: Record<string, unknown>): {
  data: DemoRequest;
  errors: FieldErrors;
} {
  const data: DemoRequest = {
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    company: clean(input.company),
    role: clean(input.role),
    message: clean(input.message),
  };

  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!data.email) errors.email = "Please enter your work email.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (!data.company) errors.company = "Please enter your company.";
  else if (data.company.length > LIMITS.company) errors.company = "Company name is too long.";

  if (!data.role) errors.role = "Please enter your role.";
  else if (data.role.length > LIMITS.role) errors.role = "Role is too long.";

  if (data.message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { data, errors };
}
