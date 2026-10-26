import "../styles/Map_Card.css";
import star from "../assets/star.svg";

function Map_Card({ pic, name, place, review, meter }) {
    return (
        <div>   
            <img src={pic} alt="" class="card-img"/>
            <div className="info">
                <h3 className="name">{name} <img src={star} alt="" className="star"/></h3>
                <p className="place">{place}</p>
                <p className="more-info"><span className="review">{review}</span><span className="meter">{meter}</span></p>
            </div>
        </div>
    );
}
export default Map_Card;