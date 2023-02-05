import {Button} from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { ABI,contractAddress } from "../solidityFiles/KYC"
export default function Details(){
  const navigate = useNavigate();
  const [state, setState] = useState({
    aadhar: '',
    creditScore:'',
    activeLoans: '',
    closedLoans: '',
    loanEnquiry: ''
   
  })

  const isDisabled=(state.aadhar=== ''||
  state.creditScore===''||
  state.activeLoans===''||
  state.closedLoans=== ''||
  state.loanEnquiry=== '')

  //to handle change of input state while tying data
  
    const handleChange = event => {
      setState({ ...state, [event.target.name]: event.target.value });
    };



    const handleSubmit = async(event) => {
     
      event.preventDefault();
      if (typeof window.ethereum !== 'undefined') {
      const eth_account=await window.ethereum.enable()
      console.log(eth_account)
  
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);

      
      try {
        const result =await window.contract.methods.addCustomer(state.aadhar ,state.creditScore, state.activeLoans, state.closedLoans ,state.loanEnquiry).send({ from: eth_account[0]})
        const txn=result.transactionHash
      navigate('/Success', { state: {txn}});
      } catch (error) {
        console.log(error);
        navigate('/Failure', { state: {error}});
      }


    }else {
         
         alert("MetaMask is not installed,Please install it")
       }
    }
      
   
    return(
         
        <div style={styled}>
        <form >
        <label htmlFor="aadhar">Aadhar Number:</label>
         <input type="number" id="aadhar" name="aadhar" placeholder="Enter your aadhar No" max={9999999999} value={state.aadhar} onChange={handleChange} required/><br/><br/>
         <label htmlFor="creditScore">Credit Score:</label>
          <input type="number" id="creditScore" name="creditScore" placeholder="Enter your creditScore"  max={999} value={state.creditScore} onChange={handleChange} required/><br/><br/>
          <label htmlFor="activeLoans">Active Loans:</label>
          <input type="number" id="activeLoans" name="activeLoans" placeholder="Enter your activeLoans"  max={999} value={state.activeLoans} onChange={handleChange} required/><br/><br/>
          <label htmlFor="closedLoans">Closed Loans:</label>
          <input type="number" id="closedLoans" name="closedLoans" placeholder="Enter your closedLoans"  max={999} value={state.closedLoans} onChange={handleChange} required/><br/><br/>
          <label htmlFor="loanEnquiry">Loan InQuiry:</label>
          <input type="text" id="loanEnquiry" name="loanEnquiry" placeholder="Enter your loanEnquiry" maxLength={20} value={state.loanEnquiry} onChange={handleChange} required/><br/><br/>
          
          <Button type="submit" color="dark" size="md" onClick={handleSubmit} disabled={isDisabled}> Submit </Button> 
        </form>
     
      </div>
    )
}


export const styled={
    backgroundColor:"#61DAFB",
    width: "99%",
    height:"auto",
  alignItems: 'center',
  justifyContent: "center",
    margin:" 0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily:" Arial, sans-serif",
    fontSize: "16px",
    fontWeight:"bold"
}