import '../css/Bible.css';
import React from 'react';
import PlantBibleBox from './PlantBibleBox'
     


// <<<<<<< gal
// export default function PlantsBibleGrid({q=''}) {

//     const [plants, setPlants] = React.useState([])
  
//     // React.useEffect(() => {
//     //     var url = 'http://localhost:8080/plant/admin';

//     //     if (q!=='' && q!==null)
//     //     {
//     //         url = 'http://localhost:8080/plant/byName/'+q ; 
//     //     }
//     //    axios.get(url).then((Response) => {
//     //     if (plants.length != Response.data.length)
//     //       setPlants(Response.data);
       
//     //   })
//     // }, [q]);

//     React.useEffect(() => {        
//         fetch('http://localhost:8080/plant/admin'+q)
//         .then((response) => response.json())
//         .then((data) => setPlants(data));
//      }, [q]);


//     //  if (plants.length < 1)
//     //  return "";
     
// =======
export default function PlantsBibleGrid({Q}) {

    const [plants, setPlants] = React.useState([])
    React.useEffect(() => {
       var url = 'http://localhost:8080/plant/byName/'+Q;
       axios.get(url).then((Response) => {
           if (plants.length != Response.data.length)
               setPlants(Response.data);
       })
   }, [Q]);

   if(plants.length>0)
 
    return (
        <>
            {/* Portfolio Gallery Grid */}

            <div className="row">
                {
                    plants.map((data, key) => {
                        return <PlantBibleBox id={data._id} species={data.species} photo={data.defaultPhotoID} key={key} />
                    })
                }
            </div>

        </>
    );
    else
    return ('');

}


