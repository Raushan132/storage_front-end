

const Breadcrumbs = ({path}) => {
    return (
        <>
            <div className="max-w-xl text-xl breadcrumbs">
                <ul>
                    {
                        path.map(data=>{
                            return (
                                <li key={data}><a>{data}</a></li>
                            );
                        })
                    }
                   
                    
                   
                </ul>
            </div>
        </>
    )
}

export default Breadcrumbs