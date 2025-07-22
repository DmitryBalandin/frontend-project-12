import { Link } from "react-router-dom"


function Card({ children, image, titleImage, footer }) {
    return (

        <div className="card">
            <div className="card-body">
                <img src={image} className="rounded-circle" alt={titleImage} />
                {children}
            </div>
            {
                footer && <div className="card-footer p-3">
                    <div className="text-center">
                        <span>Нет аккаунта </span><Link to="/signup">регистрация</Link>
                    </div>
                </div>
            }

        </div>

    )
}


export default Card