import { useLocation,Link } from "react-router-dom"
import { Button } from "reactstrap"
export default function Success(){
    const location = useLocation()
    console.log(location.state)

   
    return(
        <>
          
      <h1 style={styles}>successfully submitted your data &#x2713; <br></br> txn:{location.state.txn}</h1>
      <Link to="/">
        <Button type="submit" color="dark" size="md" style={BtnStyles} > Back to Home </Button>
    </Link>
        </>
    )
}
const styles={
    color:"Green",
    fontWeight:"bold",
    fontStyle:"italic",
    textAlign:"center",
    justifyContent: "center",
    marginTop:"15%"
}
export const  BtnStyles={
    color:"white",
    fontWeight:"bold",
    fontStyle:"italic",
    textAlign:"center",
    justifyContent: "center",
    marginLeft:"45%"
}
