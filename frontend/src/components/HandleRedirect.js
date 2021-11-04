import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

function HandleRedirect() {
  const [error, setError] = useState();
  const [longUrl, setLongUrl] = useState();

  const {
    params: { hash },
  } = useRouteMatch()

  useEffect(() => {
    async function getData() {
      return axios
        .get(`http://localhost:5000/api/v1/url/${hash}`)
        .then((res) => {
          setLongUrl(res.data.longUrl)
        })
        .catch((error) => {
          setError(`Long URL was not found for hash '${hash}'`);
        });
    }
    console.log(getData());
  }, [hash]);
  return <p>{error && JSON.stringify(error)}{longUrl && (
    setTimeout(() => { window.location.href = longUrl }), 4000 &&
    <div>You will now be redirected to {longUrl} </div>
  )}</p>;
}

export default HandleRedirect;