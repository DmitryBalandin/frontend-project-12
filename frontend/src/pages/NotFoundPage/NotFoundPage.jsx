import Navigation from "../../componenets/Navigation/Navigator"
import imageNtFound from "../../assets/404-D_FLHmTM (1).svg"
import { Link } from "react-router-dom"
function NotFoundPage(){
    return (
     <div className="container-fluid p-0">
        <div className="d-flex flex-column justify-content-between vh-100">
               <Navigation/>
                <div className="align-self-center text-center">
                    <img src={imageNtFound} className="img-fluid" alt="Page not found" />
                    <h1 className="text-muted h4">Страница не найдена</h1>
                    Но вы можете перейти &nbsp;
                     <Link to="/">на главную страницу</Link>
                </div>
                <footer>
                    
                </footer>
        </div>
     </div>
)
}

export default NotFoundPage