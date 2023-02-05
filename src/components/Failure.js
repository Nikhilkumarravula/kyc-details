import { useLocation,Link} from "react-router-dom"
import { Button } from "reactstrap"
import { BtnStyles } from "./Success"
export default function Failure(){
    const location = useLocation()
    console.log(location.state)

    // tried to add error logs to failure page but couldn't, can improve to include logs aswell can user can be waware of what is the error
return(
    <><h1 style={styles}>Failure with the transaction : {location.state.error.message}</h1><Link to="/">
        <Button type="submit" color="dark" size="md" style={BtnStyles}> Back to Home </Button>
    </Link></>
)


}

const styles={
    color:"Red",
    fontWeight:"bold",
    fontStyle:"italic",
    textAlign:"center",
    justifyContent: "center",
    marginTop:"15%"
}