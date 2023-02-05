import {Button} from 'reactstrap';
import { useState } from 'react';
import Web3 from 'web3';
import { useNavigate,Link } from 'react-router-dom';
import { ABI,contractAddress } from "../solidityFiles/KYC"
import { styled } from './Details';
import { BtnStyles } from './Success';


export default function GetDetails(){
  
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    aadhar: '',
    addValidator:'',
    removeValidator: '',
    changeOwner:''
  })

  //Used to get& set  output result of function calls
  const [result,setResult]=useState([])
  const [addResult,setAddResult]=useState([])
  const [removeResult,setRemoveResult]=useState([])
  const [changeResult,setChangeResult]=useState([])

  //used for displaying the html results after submiiting the data succesfully
  const [aadharSubmitted, setAadharSubmitted] = useState(false)
  const [addSubmitted, setAddSubmitted] = useState(false)
  const [removeSubmitted, setRemoveSubmitted] = useState(false)
  const [changeSubmitted, setChangeSubmitted] = useState(false)
  // const [ethAccount,setEthAccount]=useState([])

  
//to maintain state of submit button
  const aadharDisabled=(state.aadhar=== '')
  const addDisabled=(state.addValidator=== '')
  const removeDisabled=(state.removeValidator=== '')
  const changeDisabled=(state.changeOwner=== '')
  
  // useEffect(() => {
  //   setupweb3();
  // }, []);

   //to handle change of input state while tying data

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
   
 

  //runs after submitting aadhar details
  const aadharSubmit=async(event)=>{
      
    event.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const eth_account = await window.ethereum.enable();
      console.log(eth_account);
      // setEthAccount(eth_account);
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);


      try {
        let data =await window.contract.methods.getCustomerData(state.aadhar).call({ from: eth_account[0] })
        console.log(data)
        setResult(data)
        console.log(data)
        setAadharSubmitted(true)
      
      } catch (error) {
        console.log(error);
        navigate('/Failure', { state: {error}});
      }
    }
   
    else {
      alert("MetaMask is not installed,Please install it");
    }

  }

  //runs after submitting adding validator
  const addSubmit=async(event)=>{
    event.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const eth_account = await window.ethereum.enable();
      console.log(eth_account);
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    try {
     
      console.log()
      let data =await window.contract.methods.addAuthorizedAddress(state.addValidator).send({ from: eth_account[0]  })
      console.log(data)
      setAddResult(data)
      console.log(data)
      setAddSubmitted(true)
    
    } catch (error) {
      console.log(error);
      navigate('/Failure', { state: {error}});
      
    }
  } else {
    alert("MetaMask is not installed,Please install it");
  }

  }

  //runs after removing adding validator
  const removeSubmit=async(event)=>{
    event.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const eth_account = await window.ethereum.enable();
      console.log(eth_account);
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    try {
      let data =await window.contract.methods.removeAuthorizedAddress(state.removeValidator).send({ from: eth_account[0]  })
      console.log(data)
      
      setRemoveSubmitted(true)
      setRemoveResult(data)
    } catch (error) {
      console.log(error);
      navigate('/Failure', { state: {error}});
     
    }
  }else {
    alert("MetaMask is not installed,Please install it");
  }
  }

 //runs after changing owner
  const changeSubmit=async(event)=>{
    event.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const eth_account = await window.ethereum.enable();
      console.log(eth_account);
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    try {
      let data =await window.contract.methods.changeOwnership(state.changeOwner).send({ from: eth_account[0]  })
      console.log(data)
      
      setChangeSubmitted(true)
      setChangeResult(data)
    } catch (error) {
      console.log(error);
      navigate('/Failure', { state: {error}});
     
    }
  }else {
    alert("MetaMask is not installed,Please install it");
  }
  }

    return(

      
         <>
        <div style={styled}>
        <form>
        <label htmlFor="aadhar">Get User Loan Details</label>
        <input type="number" id="aadhar" name="aadhar" placeholder="Enter user aadhar No" onChange={handleChange} max={9999999999} required/>
        <Button type="submit" color="dark" size="md" onClick={aadharSubmit} disabled={aadharDisabled} > Submit </Button> 
        </form>
         

        {aadharSubmitted && state.aadhar ? (
          <><label htmlFor="aadhar">aadhar:{result[0]}</label>
          <br></br>
          <label htmlFor="creditScore">Credit Score: {result[1]}</label>
          <br></br>
          <label htmlFor="activeLoans">Active Loans:{result[2]}</label>
          <br></br>
          <label htmlFor="closedLoans">Closed Loans:{result[3]}</label>
          <br></br>
          <label htmlFor="loanEnquiry">Loan InQuiry:{result[4]}</label><br></br></>
       
      ) : (<p></p>)}

        
         <br/><br/>
         <form>
         <label htmlFor="addValidator">add Validator Address</label>
        <input type="string" id="addValidator" name="addValidator" placeholder="Enter ethereum address" onChange={handleChange} maxLength={42}required/>
        <Button type="submit" color="dark" size="md" onClick={addSubmit} disabled={addDisabled}> Submit </Button> 
         </form>
        

         {addSubmitted && state.addValidator ? (
          <>
          <p>txn:{addResult.transactionHash}</p>
          </>
      ) : (<p></p>)}




         <br/><br/>
          <form>
          <label htmlFor="removeValidator">remove Validator Address</label>
        <input type="string" id="removeValidator"name="removeValidator" placeholder="Enter ethereum address" onChange={handleChange} maxLength={42} required/>
        <Button type="submit" color="dark" size="md" onClick={removeSubmit} disabled={removeDisabled}> Submit </Button> 
          </form>
          {removeSubmitted && state.removeValidator ? (
          <>
          <p>Removed Done:{removeResult.transactionHash}</p>
          </>
       
      ) : (<p></p>)}


         <br/><br/>


         <form>
          <label htmlFor="changeOwner">change Owner Address</label>
        <input type="string" id="changeOwner"name="changeOwner" placeholder="Enter ethereum address" onChange={handleChange} maxLength={42} required/>
        <Button type="submit" color="dark" size="md" onClick={changeSubmit} disabled={changeDisabled}> Submit </Button> 
          </form>
          {changeSubmitted && state.changeOwner ? (
          <>
          <p>changed Owner txn:{changeResult.transactionHash
}</p>
          </>
       
      ) : (<p></p>)}


         <br/><br/>


         <Link to="/">
        <Button type="submit" color="dark" size="md" style={BtnStyles} > Back to Home </Button>
    </Link>
        
          
     
      </div>
      </>
    )
}




