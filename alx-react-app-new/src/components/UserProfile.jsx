 function UserProfile (props) {
   return (
     <div className="UserProfile" style= {{ 
        border: '1px solid gray', 
        padding: '10px', 
        margin: '10px' 
        }}>
       <h2 style={{ 
        color: 'blue' 
        }}>{props.name}</h2>
       <p>Age: <span style={{ 
        fontWeight: 'bold' 
        }}></span> {props.age}</p>
       <p>Bio: {props.bio}</p>
     </div>
   );
 };

 export default UserProfile;