import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError(); // as we have used this component as a value for errorElement in routes initialization , it will have an access to the error that has been occurred 

 // console.log(error); //error object with multiple properties
 
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.date || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
