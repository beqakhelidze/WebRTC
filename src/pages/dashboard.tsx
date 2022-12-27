import React from "react";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {

    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/todos/",1);

    return ( 
        <div>
            dashoard
        </div>
     );
}
 
export default Dashboard;