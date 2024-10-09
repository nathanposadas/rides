import { useState, useEffect, useCallback } from "react";

// Utility function to fetch data from an API
export const fetchAPI = async (url: string, options: RequestInit = {}) => {
  try {
    // Ensure headers are set for JSON requests, if not already provided
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    
    const finalOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, finalOptions);

    // Check if the response status is not OK (status code is not 2xx)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    // Check if the response is JSON by inspecting the Content-Type header
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // Parse JSON if it's valid
    } else {
      const text = await response.text(); // Get raw response text if it's not JSON
      return { message: text }; // Return a structured response for non-JSON
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

// Custom hook to fetch data using the fetchAPI function
export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result); // Assuming the result is the desired data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
