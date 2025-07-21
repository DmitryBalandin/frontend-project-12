import { Link } from "react-router-dom"

function Card({children}) {
    return (
        
            <div className="card">
                <div className="card-body">
                    {children}
                </div>
                 
                <div className="card-footer p-3">
                    <div className="text-center">
                        <span>Нет аккаунта </span><Link to="/signup">регистрация</Link> 
                    </div>
                </div>
            </div>
       
    )
}


export default Card