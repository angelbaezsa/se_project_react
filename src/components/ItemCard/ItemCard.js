import "./ItemCard.css";

function ItemCard({ item, onclickedCard }) {
  return (
    <>
      <div className="card">
        <div className="card_title-wrapper">
          <p className="card_title">{item.name}</p>
        </div>
        <img
          className="card_image"
          src={item.link}
          alt={`illustration of ${item.name}`}
          onClick={() => {
            onclickedCard(item);
          }}
        />
      </div>
    </>
  );
}

export default ItemCard;
