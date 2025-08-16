import Navigation from "../../componenets/Navigation/Navigator"
import Card from "../../componenets/Card/Card"
import img from "../../assets/avatar_1-D7Cot-zE.jpg"
import RegistrationForm from "../../componenets/RegistrationForm/RegistrationForm"


function SignUpPage() {
    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-column justify-content-between vh-100">
                <Navigation />
                <div className="align-self-center text-center col-12 col-md-8 col-xxl-6">
                    <Card image={img} titleImage="Регистрация" >
                     <RegistrationForm/>
                    </Card>
                </div>
                <footer>

                </footer>
            </div>
        </div>)
}

export default SignUpPage