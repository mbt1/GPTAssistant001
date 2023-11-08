import React from 'react';

const targetAPIBaseURL = process.env.REACT_APP_TARGET_API_BASE_URL;

export interface SOMETHING {
  id: string;
  content: string;
}
  
interface AppProps {
  searchTerm: string;
}

const APIReader: React.FC<AppProps> = ({searchTerm}) => {
  const [SOMETHINGs, setSOMETHINGs] = React.useState<SOMETHING[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if(searchTerm!=""){
      console.log('Processing SOMETHING for SearchTerm:',searchTerm)
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      setIsLoading(true)
      fetch(`${targetAPIBaseURL}/api/main/?search_term=${encodedSearchTerm}`)
        .then((response) => response.json())
        .then((data: SOMETHING[]) => {
          // Rate Limiter
          return new Promise(resolve => setTimeout(() => resolve(data), 3000));
        })
        .then((data: SOMETHING[]) => {
          setSOMETHINGs(data)
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))

    }
  }, [searchTerm]);

  if(searchTerm == ""){
    return(
      <>
      <div className='warning'><span>Please provide a search term!</span></div>
      </>
    )
  }
  if(isLoading){
    return <div className='Loading'><span>Loading...</span></div>
  }
  return (
    <ul>
    {SOMETHINGs.map((SOMETHING)=><li>{SOMETHING.content}</li>)}
    </ul>
  );
};

export default APIReader;

