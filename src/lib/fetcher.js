// export const fetcher = async (url) => {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch");
//     return res.json();
//   };
  


export const fetcher = (...args) => fetch(...args).then((res) => res.json());
