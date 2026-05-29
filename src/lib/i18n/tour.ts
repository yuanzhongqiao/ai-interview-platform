export function tourStepTitle(
  stepId: string,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  return t(`tour.steps.${stepId}.title`);
}

export function tourStepDescription(
  stepId: string,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  return t(`tour.steps.${stepId}.description`);
}
