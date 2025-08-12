export function extractErrorMessage(error) {
  return error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";
}