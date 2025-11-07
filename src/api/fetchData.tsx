export interface HttpError extends Error {
  status?: number;
  data?: unknown;
}

const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchData(
  endpoint: string,
  method: string,
  body?: object
): Promise<Response> {
  const url = `${API_BASE}/${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Extract backend message
      const errorData = await response.json().catch(() => ({}));

      const error: HttpError = new Error(
        `HTTP error! Status: ${response.status} - ${
          (errorData as { message?: string }).message ||
          response.statusText ||
          "Unknown error"
        }`
      );

      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Return response in when no error accurs.
    return response;
  } catch (error: unknown) {
    // Rethrow err using correct type
    if (error instanceof Error) {
      console.error("Error happened in fetch request:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred in fetch request:", error);
      const unknownError: HttpError = new Error("Unknown fetch error");
      throw unknownError;
    }
  }
}
