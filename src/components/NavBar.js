
import img from "../logo.svg"
import {Navbar,Button,NavbarBrand} from 'reactstrap';
import { Link } from "react-router-dom";
import { useState } from "react";
export default function NavBar(){
const [wallet,setWallet]=useState([])


//connecting wallet
const  connect=async()=>{
  if (typeof window.ethereum !== 'undefined') {
    console.log(window.ethereum)
     let ethaccount = await window.ethereum.enable()
     setWallet(ethaccount)
     console.log(wallet[0])
  } else {
    
    alert("MetaMask is not installed,Please install it")
  }
}

return(
 <>
 <div style={{fontFamily:"Papyrus"}}>
   <Navbar color="black" className="my-2" dark>
  
   <NavbarBrand href="/" className=' hover-zoom' style={{marginRight:"30%"}} >
      
   <img src={img} alt="React logo" width="62" height="42"  />
      Decentral-KYC-Portal
    </NavbarBrand>

    <Link to="/getDetails">
<Button color="light"size="md" style={{backgroundColor: "red"}} > Validator</Button> 
  </Link> 
   
    <Button color="light"size="md" onClick={connect}> {wallet.length ?(wallet[0]):"connectWallet"}</Button>
   
   
   </Navbar>
 </div>

    
    
 </>
);
}