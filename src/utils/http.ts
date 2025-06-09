// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const httpGet = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "text/json",
      },
    });

    // To catch 4xx errors sent by servor
    if (!response.ok) {
      throw new HttpError({
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
        body: (await response.json()) as Record<string, unknown>,
      });
    }

    return await response.json();
  } catch {
    throw new Error("Error in fetchWrapper");
  }
};

class HttpError extends Error {
  readonly name: string;
  readonly status: number;
  readonly body: Record<string, unknown>;

  constructor(error: {
    message: string;
    status: number;
    body: Record<string, unknown>;
  }) {
    super(error.message);
    this.name = "HttpError";
    this.status = error.status;
    this.body = error.body;
  }
}
