import  { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function AutoComplete(){
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const fetchData = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.mapy.cz/v1/suggest?lang=cs&limit=5&type=regional.address&apikey=${encodeURI(process.env.MAPY_API_KEY as string)}&query=${encodeURI(query)}`
      );
  
      const data = await response.json();
      const suggestions = data.items.map((item: any) => ({ id: item.id, name: `${item.name}, ${item.zip}, ${item.location}`}));
      setItems(suggestions);
    } catch (error) {
      console.error("error");
      setItems([]);
    }
  };
  

  return (
    <div style={{width: "400px"}}>
    <ReactSearchAutocomplete
      styling={
        {borderRadius: "12px", backgroundColor: "#EFEFEF;", zIndex: 99}
      }
      items={items}
      onSearch={fetchData}
      onClear={() => setItems([])}
      onSelect={(item) => setValue(item)}
      placeholder="Zadejte adresu..."
      autoFocus
      showNoResultsText="Nenalezeno"
    />
    </div>
  );
};