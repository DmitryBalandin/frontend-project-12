import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
function MainPage() {
    const navigator = useNavigate();

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        console.log(userId)
        if (!userId) {
            navigator('/login');
        }
    }, [])
    return (
        <div>
            Main
        </div>)
}

export default MainPage