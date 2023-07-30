import "./ItemCard.css";

function ItemCard({item}){
    return(
        <>
            <div className="card">
                <div className ="card_title-wrapper">
                <p className ="card_title">{item.name}</p>
                </div>
                <img className ="card_image" src={item.link} alt={`illustration of ${item.name}`} />
            </div>
        </>  
    )
}

export default ItemCard