// import { useState, useEffect } from "react";

// const useFetch = (url, options = {}) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(url, {
//           headers: {
//             "Content-Type": "application/json",
//             ...options.headers,
//           },
//           ...options,
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (url) {
//       fetchData();
//     }
//   }, [url]);

//   const refetch = async () => {
//     if (url) {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(url, {
//           headers: {
//             "Content-Type": "application/json",
//             ...options.headers,
//           },
//           ...options,
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//         console.error("Refetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return { data, loading, error, refetch };
// };

// export default useFetch;




import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          credentials: 'include',  // <-- Added here
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const refetch = async () => {
    if (url) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          credentials: 'include',  // <-- Added here too
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error("Refetch error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
