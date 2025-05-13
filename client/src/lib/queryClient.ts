import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMessage;
    try {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        // Log the raw response for debugging
        const responseText = await res.clone().text();
        console.log("Raw response:", responseText);
        
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || res.statusText;
        } catch (jsonError: unknown) {
          const errorMsg = jsonError instanceof Error ? jsonError.message : 'Unknown JSON parsing error';
          console.error("Failed to parse JSON response:", jsonError, "Raw response:", responseText);
          errorMessage = `Failed to parse server response: ${errorMsg}`;
        }
      } else {
        errorMessage = await res.text();
      }
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      errorMessage = `${res.status}: ${res.statusText} (Failed to parse response)`;
    }
    
    throw new Error(`${res.status}: ${errorMessage}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    // Log outgoing requests for debugging
    if (data) {
      console.log(`API Request ${method} ${url}:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`API Request ${method} ${url}`);
    }
    
    // Prepare headers
    const headers: Record<string, string> = {};
    if (data) {
      headers["Content-Type"] = "application/json";
    }
    console.log(`Request headers:`, headers);
    
    // Attempt the fetch operation
    console.log(`Sending ${method} request to ${url}...`);
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    
    console.log(`Response received from ${url}:`, {
      status: res.status,
      statusText: res.statusText,
      // Convert headers to an object for logging
      headers: Array.from(res.headers).reduce((obj: Record<string, string>, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {}),
    });

    // Check if the response is valid
    if (!res.ok) {
      await throwIfResNotOk(res);
    }
    
    // For successful responses, verify we can parse the JSON before returning
    if (method !== "DELETE" && res.headers.get("content-type")?.includes("application/json")) {
      try {
        // Clone the response so we can still return the original
        const clonedRes = res.clone();
        const responseText = await clonedRes.text();
        console.log(`Successful response text from ${url}:`, responseText);
        
        if (responseText.trim() === '') {
          console.warn(`Empty response body received from ${url}`);
        } else {
          try {
            // Try to parse as JSON to validate
            JSON.parse(responseText);
            console.log(`Response from ${url} is valid JSON`);
          } catch (parseError) {
            console.error(`Response from ${url} is not valid JSON:`, parseError);
            throw new Error(`Response is not valid JSON: ${responseText.substring(0, 200)}...`);
          }
        }
      } catch (jsonError: unknown) {
        const errorMsg = jsonError instanceof Error ? jsonError.message : 'Unknown JSON parsing error';
        console.error("JSON parsing error in successful response:", jsonError);
        const responseText = await res.clone().text();
        console.log("Raw response text:", responseText);
        throw new Error(`API request succeeded but returned invalid JSON: ${errorMsg}`);
      }
    }
    
    return res;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // JSON parsing error
      console.error("JSON Parsing error in request:", error);
      throw new Error(`API request failed: Invalid JSON response - ${error.message}`);
    }
    
    // Re-throw all other errors
    console.error(`API request to ${url} failed:`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      console.log(`Query request: ${queryKey[0]}`);
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      if (!res.ok) {
        await throwIfResNotOk(res);
      }
      
      try {
        return await res.json();
      } catch (jsonError: unknown) {
        const errorMsg = jsonError instanceof Error ? jsonError.message : 'Unknown JSON parsing error';
        console.error("JSON parsing error in query response:", jsonError);
        const responseText = await res.clone().text();
        console.log("Raw response text:", responseText);
        throw new Error(`Query succeeded but returned invalid JSON: ${errorMsg}`);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // JSON parsing error
        console.error("JSON Parsing error in query:", error);
        throw new Error(`Query failed: Invalid JSON response - ${error.message}`);
      }
      
      // Re-throw all other errors
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
