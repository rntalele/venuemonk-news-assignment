
const Card = ({cardDetails})=>{

    const getDateString = (dateStr)=>{
        let date = new Date(dateStr).toLocaleString();
        return date;
    }


    return(
        <>
            {
            
                <div className="card mt-2" style={{width:'500px'}}>
                    <img className="card-img-top" src={cardDetails.urlToImage} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{cardDetails.title}</h5>
                        <p className="card-text">{cardDetails.description}</p>
                        <a href={cardDetails.url} target='_blank' className="btn btn-primary mb-2">Read Full Story</a>
                        <blockquote className="blockquote mb-0 mt-4">
                            <footer className="blockquote-footer"> <cite title="Source Title">{cardDetails.author || 'No Author Available'}</cite></footer>
                        </blockquote>
                    </div>
                    <div className="card-footer text-muted">
                        {getDateString(cardDetails.publishedAt)}
                    </div>
                </div>
            }
        </>
        
    )
}

export default Card;