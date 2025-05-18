export const isErrorApp = (error: unknown) => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (
    !("name" in error) ||
    !("message" in error) ||
    !("code" in error) ||
    !("digest" in error) ||
    !("stack" in error)
  ) {
    return false;
  }

  const possibleError = error as Record<string, unknown>;

  return (
    typeof possibleError.name === "string" &&
    typeof possibleError.message === "string" &&
    typeof possibleError.code === "number" &&
    typeof possibleError.digest === "string" &&
    typeof possibleError.stack === "string"
  );
};
