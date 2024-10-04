export async function fetchPrivateChannel(
  userId: number,
  targetUser: number
): Promise<any> {
  const dataObj = {
    userId: userId,
    targetUser: targetUser,
  };

  console.log(dataObj, 'dataObj');
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}:${
      import.meta.env.VITE_API_PORT
    }`;
    const response = await fetch(`${apiUrl}/channel/private`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    });

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching private channel from ${response.url}`
      );
    }
    // const payload = await response.json();

    // return payload;
    console.log(response, 'reponse du fetchPrivateChannel');
    return response.json();
  } catch (error) {
    console.error('Failed to fetch private channel:', error);
    throw new Error('Failed to fetch private channel. Please try again later.');
  }
}

// export async function fetchPrivateChannel(
//   userId: number,
//   targetUser: number
// ): Promise<any> {
//   const dataObj = {
//     userId: userId,
//     targetUser: targetUser,
//   };

//   console.log(dataObj, 'dataObj');
//   try {
//     const apiUrl = `${import.meta.env.VITE_API_URL}:${
//       import.meta.env.VITE_API_PORT
//     }`;

//     console.log(apiUrl, 'apiUrl');
//     const response = await fetch(`${apiUrl}/channel/private`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataObj),
//     });

   

//     if (!response.ok) {
//       throw new Error(
//         `Error: ${response.status} ${response.statusText} while fetching private channel from ${response.url}`
//       );
//     } else {
//       const data = await response.json();

//       console.log(data, 'Données renvoyées par le serveur');
//       return data;
//     }
//   } catch (error) {
//     console.error('Failed to fetch private channel:', error);
//     throw new Error('Failed to fetch private channel. Please try again later.');
//   }
// }
