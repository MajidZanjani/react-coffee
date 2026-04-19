import products from "../data/products.json";

export interface HttpError extends Error {
  status?: number;
  data?: unknown;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Product = (typeof products)[number];

function createMockResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function createHttpError(
  status: number,
  message: string,
  data?: unknown,
): HttpError {
  const error: HttpError = new Error(message);
  error.status = status;
  error.data = data;
  return error;
}

export async function fetchData(
  endpoint: string,
  method: string,
  body?: object,
): Promise<Response> {
  const normalizedMethod = method.toUpperCase() as HttpMethod;
  const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, "");
  const segments = cleanEndpoint.split("/");

  try {
    // Small delay to simulate real API request
    await new Promise((resolve) => setTimeout(resolve, 200));

    // GET /products
    if (normalizedMethod === "GET" && cleanEndpoint === "products") {
      return createMockResponse(products);
    }

    // GET /products/:category
    if (
      normalizedMethod === "GET" &&
      segments[0] === "products" &&
      segments[1]
    ) {
      const category = decodeURIComponent(segments[1]).toLowerCase();

      const filteredProducts = products.filter(
        (product: Product) => product.category.toLowerCase() === category,
      );

      if (filteredProducts.length === 0) {
        throw createHttpError(
          404,
          `No products found for category: ${category}`,
          {
            message: `No products found for category: ${category}`,
          },
        );
      }

      return createMockResponse(filteredProducts);
    }

    // GET /product/:name
    if (
      normalizedMethod === "GET" &&
      segments[0] === "product" &&
      segments[1]
    ) {
      const productName = decodeURIComponent(segments[1]).toLowerCase();

      const product = products.find(
        (item: Product) => item.name.toLowerCase() === productName,
      );

      if (!product) {
        throw createHttpError(404, `Product not found: ${segments[1]}`, {
          message: `Product not found: ${segments[1]}`,
        });
      }

      return createMockResponse(product);
    }

    // Mock POST /products
    if (normalizedMethod === "POST" && cleanEndpoint === "products") {
      return createMockResponse(
        {
          message: "Product created successfully (mocked)",
          product: body ?? null,
        },
        201,
      );
    }

    // Mock PUT/PATCH /product/:name
    if (
      (normalizedMethod === "PUT" || normalizedMethod === "PATCH") &&
      segments[0] === "product" &&
      segments[1]
    ) {
      const productName = decodeURIComponent(segments[1]).toLowerCase();

      const existingProduct = products.find(
        (item: Product) => item.name.toLowerCase() === productName,
      );

      if (!existingProduct) {
        throw createHttpError(404, `Product not found: ${segments[1]}`, {
          message: `Product not found: ${segments[1]}`,
        });
      }

      return createMockResponse({
        message: "Product updated successfully (mocked)",
        product: {
          ...existingProduct,
          ...(body ?? {}),
        },
      });
    }

    // Mock DELETE /product/:name
    if (
      normalizedMethod === "DELETE" &&
      segments[0] === "product" &&
      segments[1]
    ) {
      const productName = decodeURIComponent(segments[1]).toLowerCase();

      const existingProduct = products.find(
        (item: Product) => item.name.toLowerCase() === productName,
      );

      if (!existingProduct) {
        throw createHttpError(404, `Product not found: ${segments[1]}`, {
          message: `Product not found: ${segments[1]}`,
        });
      }

      return createMockResponse({
        message: "Product deleted successfully (mocked)",
      });
    }

    throw createHttpError(
      404,
      `Mock endpoint not found: ${method} ${endpoint}`,
      {
        message: `Mock endpoint not found: ${method} ${endpoint}`,
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error happened in mock fetch request:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred in mock fetch request:", error);
      const unknownError: HttpError = new Error("Unknown mock fetch error");
      throw unknownError;
    }
  }
}
