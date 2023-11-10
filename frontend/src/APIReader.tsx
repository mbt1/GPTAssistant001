import React from 'react';
import {useAuthToken} from "./AuthTokenContext"

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
  const { token: authToken, error: authError, getToken: getAuthToken } = useAuthToken();

  React.useEffect(() => {
    (async () =>{
      if(searchTerm!=""){
        if (!authToken) {
          getAuthToken();
        }else{
          if(authError){
            console.error(`Token Error:${authError}`)
          }else{
            console.log('Processing SOMETHING for SearchTerm:',searchTerm)
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            setIsLoading(true)
            console.warn(`calling backend /api/main/?search_term=${encodedSearchTerm} with authToken: ${authToken}`)
            fetch(`${targetAPIBaseURL}/api/main/?search_term=${encodedSearchTerm}`,{
              headers: {
                Authorization: `Bearer ${authToken}` // accessToken obtained from Azure AD B2C after successful authentication
              }
            })
              .then((response) => response.json())
              .then((data: SOMETHING[]) => {
                // Rate Limiter
                return new Promise(resolve => setTimeout(() => resolve(data), 3000));
              })
              .then((data: SOMETHING[]) => {
                setSOMETHINGs(data)
              })
              .catch(error=>{console.error("API not accessible:",error)})
              .finally(() => setIsLoading(false))
            }
          }
        }
    })();
  }, [searchTerm, authToken]);

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
    {SOMETHINGs.map((SOMETHING)=><li key={SOMETHING.id}>{SOMETHING.content}</li>)}
    </ul>
  );
};

export default APIReader;

