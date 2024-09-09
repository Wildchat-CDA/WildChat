import { useEffect, useState } from 'react';

function Test() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/section', {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <h1>Test</h1>;
}

export default Test;
