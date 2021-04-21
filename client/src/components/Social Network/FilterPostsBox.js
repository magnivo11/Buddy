 import React,{inputRef,useState,useRef} from 'react';

export default function FilterPostsBox({posts, setPosts}) {

        const [Allposts,setAllPosts]=React.useState([]);

        React.useEffect(() => {
        fetch('http://localhost:8080/post')
          .then(response => response.json()).then(
            data => {setAllPosts(data)
            }
          )
      }, []);
const onClick=(color)=>{
    filterPosts(color,setPosts,Allposts);
}

function filterPosts(e,setPosts,Allposts){
   e.preventDefault();
  const form = document.forms.filterForm;
  const statusArray = form.elements.status;
  var status;

  //getting status
  for(var i = 0; i <statusArray.length; i++){
    if(statusArray[i].checked){
        status=statusArray[i].id;
      }
    };
    if(status!='nofilter')
     setPosts(Allposts.filter((post)=>(post.status ===status)))
     else
     setPosts(Allposts)
}
      return (


        <div className="w3-row-padding">
            <p className="w3-center">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding"> 
                <div className="example-wrapper">
          </div>
  
              <form name='filterForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              filterPosts(e,setPosts,Allposts)
            }}>
                <label className="radio-inline">
                <p style={{fontSize:'14px'}}>Filter by status:</p>
                  </label>

                    <label className="radio-inline">
                    <input style={{backgroundColor:'red'}} type="radio" id='green' name="status" /> <label style={{color:'green'}}htmlFor="south">Green</label><br/>
                  </label> 

                    <label className="radio-inline">
                    <input type="radio" id='orange' name="status"  /><label style={{color:'orange'}} htmlFor="west">Yellow</label><br />
                    </label>    
                    <label className="radio-inline">
                <input  type="radio" id='red' name="status"  /> <label style={{color:'red'}} htmlFor="north">Red</label><br />
                  </label>       
                  <label className="radio-inline">
                <input  type="radio" id='nofilter' name="status"  /> <label style={{color:'black'}} htmlFor="north">No filter&nbsp;&nbsp;</label><br />
                  </label>     
                   <button  style={{fontSize:'12px', border:'none'}} type="submit" className="w3-button w3-theme-d2 w3-margin-bottom">Filter</button> &nbsp;
              </form>  
                  
                 </div>
                </div>
            </div>
            </p>

        </div>
        // <div>
        //   <ul style={{backgroundColor:'rgba(12, 11, 9, 0.6)'}}>
        //   <style dangerouslySetInnerHTML={{__html: "\nul {\n  list-style-type: none;\n  margin: 0;\n  padding: 50;\n  overflow: hidden;\n}\n\nli {\n  align-text:center; float:left;\n}\n\nli a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\n\nli a:hover {\n  background-color: #111;\n}\n" }} />
        //     <li><a style={{color:'white'}} onClick={()=>onClick('nofilter')}>Filter by status:</a></li>
        //     <li><a style={{color:'white'}} onClick={()=>onClick('red')}>Red</a></li>
        //     <li><a style={{color:'white'}} onClick={()=>onClick('orange')}>Yellow</a></li>
        //     <li><a style={{color:'white'}} onClick={()=>onClick('green')}>Green</a></li>
        //   </ul>
        // </div>
      );
    }
// import React,{inputRef,useState,useRef} from 'react';
// //import MultiSelect from "react-multi-select-component";
// import "../../css/FilterPostsBox.css";

// import  ReactDOM from 'react-dom';


// export default function FilterPostsBox({posts, setPosts}) {
//     const [Allposts,setAllPosts]=React.useState([]);
//     const [base,setBase]=React.useState([
//             { label: "Grapes", value: "grapes" },
//             { label: "Mango 🥭", value: "mango" },
//             { label: "Strawberry 🍓", value: "strawberry", disabled: true },
//             { label: "Watermelon 🍉", value: "watermelon" },
//             { label: "Pear 🍐", value: "pear" },
//             { label: "Apple 🍎", value: "apple" },
//             { label: "Tangerine 🍊", value: "tangerine" },
//             { label: "Pineapple 🍍", value: "pineapple" },
//             { label: "Peach 🍑", value: "peach" }
//     ])
    
//     React.useEffect(() => {
//         fetch('http://localhost:8080/post')
//           .then(response => response.json()).then(
//             data => {setAllPosts(data)
//             }
//           )
//       }, []);
//     return (

//         <div>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

//               <ul>
//                 <li ></li>
//                 <li>k</li>
//                 <li>j</li>
//                 <li>j</li>
 
//               </ul>
  
//       </div>


//         // <div className="w3-row-padding">
//         //     <p className="w3-center">
//         //     <div className="w3-col m12">
//         //         <div className="w3-card w3-round w3-white">
//         //         <div className="w3-container w3-padding"> 
//         //         <div className="example-wrapper">
//         //   </div>
  
//         //       <form name='filterForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
//         //       filterPosts(e,posts,setPosts,Allposts)
//         //     }}>
//         //         <label className="radio-inline">
//         //         <p style={{fontSize:'14px'}}>Filter by status:</p>
//         //           </label>

//         //             <label className="radio-inline">
//         //             <input style={{backgroundColor:'red'}} type="radio" id='green' name="status" /> <label style={{fontSize:'14px',color:'green'}}htmlFor="south">Look at me</label><br/>
//         //           </label> 

//         //             <label className="radio-inline">
//         //             <input type="radio" id='orange' name="status"  /><label style={{color:'orange'}} htmlFor="west">Question</label><br />
//         //             </label>    
//         //             <label className="radio-inline">
//         //         <input  type="radio" id='red' name="status"  /> <label style={{color:'red'}} htmlFor="north">Help</label><br />
//         //           </label>       
//         //           <label className="radio-inline">
//         //         <input  type="radio" id='nofilter' name="status"  /> <label style={{color:'black'}} htmlFor="north">No filter&nbsp;&nbsp;</label><br />
//         //           </label>     
//         //            <button  style={{fontSize:'12px'}} type="submit" className="w3-button w3-theme-d2 w3-margin-bottom">Filter</button> &nbsp;
//         //       </form>  
                  
//         //          </div>
//         //         </div>
//         //     </div>
//         //     </p>

//         // </div>
//     );
// }


// function filterPosts(e,posts,setPosts,Allposts){

//   e.preventDefault();
//   const form = document.forms.filterForm;
//   const statusArray = form.elements.status;
//   var status;

//   //getting status
//   for(var i = 0; i <statusArray.length; i++){
//     if(statusArray[i].checked){
//         status=statusArray[i].id;
//       }
//     };
//     if(status!='nofilter')
//      setPosts(Allposts.filter((post)=>(post.status ===status)))
//      else
//      setPosts(Allposts)

// }
