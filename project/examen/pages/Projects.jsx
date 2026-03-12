import React, { useEffect, useState } from 'react'
import { getProjects } from '../src/Api';

function Projects() {
    const [Projects,setProjects]=useState([]);
    useEffect(()=>{
        loadProjects();
    },[])
    const loadProjects=async()=>{
        try{
const data= getProjects();
setProjects(data);
        }catch(error)
        {
            console.log("error")
        }
    }
  return (
    <div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default Projects