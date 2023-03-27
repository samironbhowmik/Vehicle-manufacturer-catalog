import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
function VehicleDetails() {

    const {id} = useParams()
    const [list, setList] = useState([])

    useEffect(()=>{
        vehicledata()
    },[])
    const vehicledata= async() =>{
        const res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/toyota?format=json`)
        console.log(res.data.Results);
        setList(res.data.Results)
    }
  return (

    <div>
        {/* <h3>Heading</h3>
        <p>Current head</p>
        <p>Address</p>
        <p>State</p> */}

        {list.map((item,id)=>{
            return(
                <>
                    <div key={id}>
                        <h3>{item.Mfr_Name}</h3>
                        <p>{item.PrincipalFirstName}({item.PrincipalPosition})</p>
                        <p>{item.Address}</p>
                        <p>{item.City}</p>
                    </div>
                </>
            )
        })}

        
    </div>
  )
}

export default VehicleDetails