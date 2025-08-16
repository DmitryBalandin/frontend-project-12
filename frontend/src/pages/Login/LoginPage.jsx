import Navigation from "../../componenets/Navigation/Navigator"
import Card from "../../componenets/Card/Card"
import img from "../../assets/avatar-DIE1AEpS.jpg"
import FormEntry from "../../componenets/FormEntry/FormEntry"

function LoginPage(){
    return (
    <div className="container-fluid p-0">
        <div className="d-flex flex-column justify-content-between vh-100">
               <Navigation/>
                <div className="align-self-center text-center col-12 col-md-8 col-xxl-6">
                    <Card image={img} titleImage="Войти" footer>
                        <FormEntry/>
                    </Card>
                </div>
                <footer>
                    
                </footer>
        </div>
     </div>)
}

export default LoginPage