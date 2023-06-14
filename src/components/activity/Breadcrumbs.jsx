import { Link } from "react-router-dom";


const Breadcrumbs = ({path}) => {
    console.log(path)
    return (
        <>
            <div className="max-w-xl text-xl breadcrumbs">
                <ul>
                    {
                        path.map(({pathname,link})=>{
                            return (
                                <li key={pathname}><Link to={link}>{pathname}</Link></li>
                            );
                        })
                    }
                   
                    
                   
                </ul>
            </div>
        </>
    )
}

export default Breadcrumbs