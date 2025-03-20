export const formatDateForInput = (isoString: string | null): string => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().slice(0, 16);
};
