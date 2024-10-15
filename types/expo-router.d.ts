// Create a new file: src/@types/expo-router.d.ts
declare module 'expo-router' {
  export function useRouter(): any; // Use a more specific type if you know it
  export function useSearchParams(): any; // Use a more specific type if you know it
  // Add any other types you might need
}
