import { useEffect, useState } from 'react';
import axios from 'axios';

function Hello(){
    const [message, setMessage] = useState("");

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000")
        .then(res=>setMessage(res.data.message))
        .catch(err=>console.error(err));
    }, []);

    return (
        <div>
            <h1>
                {message}
            </h1>
        </div>
    )
}

export default Hello;