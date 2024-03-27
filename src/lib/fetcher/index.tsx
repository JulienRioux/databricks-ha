import axios from "axios";

/**
 * Simple fetching function to use with useSWR
 *
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise<any>} A promise that resolves with the data retrieved from the URL.
 *
 * Example usage:
 * ```
 * fetcher('https://api.github.com/user')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 * ```
 */
export const fetcher = (url: string): Promise<any> =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
      },
    })
    .then((res) => res.data);
