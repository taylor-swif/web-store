import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./styles/FavIcon.css";
import { FavContext } from "../context/FavContext";
import { useContext, useState } from "react";

const FavIcon = ({ id }) => {
  const fav = useContext(FavContext);
  const [isFav, setIsFav] = useState(fav.includes(id));

  function changeState() {
    // docelowo tutaj będzie request do API
    // i fetch w context/FavContext.jsx
    // oraz setIsFav bazujący na nowych danych w context

    setIsFav(!isFav);
  }

  return (
    <div onClick={changeState}>
      <FontAwesomeIcon
        icon={faHeart}
        className={isFav ? "fav-icon fav" : "fav-icon"}
      />
    </div>
  );
};

export default FavIcon;
