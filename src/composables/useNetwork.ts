import { onMounted, onUnmounted } from "vue";
import network from "../utils/network";
import { useAuth } from "../composables/useAuth";
import { tokenExpired } from "../utils/tokenTools";

const useNetwork = () => {
  const { logout } = useAuth();

  onMounted(() => {
    let isRefreshingToken = false;

    // Request Interceptor
    const requestInterceptor = network.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem("access_token");

        if (!isRefreshingToken) {
          if (accessToken && tokenExpired(accessToken, 60000)) {
            await logout();
            return Promise.reject("No valid refresh token, user logged out.");
          } else if (accessToken) {
            // If the access token is still valid
            console.log("Access token is still valid");
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = network.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Token is no longer valid");
            await logout(); // Logout when token is invalid
          }

          // Handle API unavailable errors
          if (error.response.status > 500) {
            alert(
              "Elnézést kérünk, de a szolgáltatás jelenleg nem elérhető. Kérjük próbálja meg később."
            );
          }
        } else if (error.request) {
          alert(
            "Elnézést kérünk, de a szolgáltatás jelenleg nem elérhető. Kérjük próbálja meg később."
          );
        } else {
          alert("Váratlan hiba történt. Kérjük próbálja meg később.");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    onUnmounted(() => {
      network.interceptors.request.eject(requestInterceptor);
      network.interceptors.response.eject(responseInterceptor);
    });
  });
};

export default useNetwork;
