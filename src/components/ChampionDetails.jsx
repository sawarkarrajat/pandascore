import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "../styles/ChampionDetails.scss";
/**
 *
 * @param {Object} props open, champion,onClose
 */
export default function ChampionDetails({ open, champion, onClose }) {
  /**
   * a condition to check if champion detail is triggered
   * if triggered then a portal will be created on a different node
   */
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div onClick={onClose} className="championDetails__overlay" />
      <div className="championDetails__container">
        <div className="championDetails__imgContainer">
          <img
            className="championDetails__img loading"
            src={champion.big_image_url}
            alt={champion.name}
          />
        </div>
        <div className="championDetails__textContainer">
          <h1>"{champion.name}"</h1>
          <p className="championDetails__text">
            <strong>armor :</strong>&nbsp;
            {champion.armor}
          </p>
          <p className="championDetails__text">
            <strong>armor per level :</strong>&nbsp;
            {champion.armorperlevel}
          </p>
          <p className="championDetails__text">
            <strong>attack damage :</strong>&nbsp;
            {champion.attackdamage}
          </p>
          <p className="championDetails__text">
            <strong>attack damage per level :</strong>&nbsp;
            {champion.attackdamageperlevel}
          </p>
          <p className="championDetails__text">
            <strong>crit :</strong>&nbsp;
            {champion.crit}
          </p>
          <p className="championDetails__text">
            <strong>crit per level :</strong>&nbsp;
            {champion.critperlevel}
          </p>
          <p className="championDetails__text">
            <strong>hp :</strong>&nbsp;
            {champion.hp}
          </p>
          <p className="championDetails__text">
            <strong>hp per level :</strong>&nbsp;
            {champion.hpperlevel}
          </p>
          <p className="championDetails__text">
            <strong>hp regeneration :</strong>&nbsp;
            {champion.hpregen}
          </p>
          <p className="championDetails__text">
            <strong>hp regeneration per level :</strong>&nbsp;
            {champion.hpregenperlevel}
          </p>
          <p className="championDetails__text">
            <strong>mp :</strong>&nbsp;
            {champion.mp}
          </p>
          <p className="championDetails__text">
            <strong>mp per level :</strong>&nbsp;
            {champion.mpperlevel}
          </p>
          <p className="championDetails__text">
            <strong>mp regeneration :</strong>&nbsp;
            {champion.mpregen}
          </p>
          <p className="championDetails__text">
            <strong>mp regeneration per level :</strong>&nbsp;
            {champion.mpregenperlevel}
          </p>
          <p className="championDetails__text">
            <strong>spellblock :</strong>&nbsp;
            {champion.spellblock}
          </p>
          <p className="championDetails__text">
            <strong>spellblock per level :</strong>&nbsp;
            {champion.spellblockperlevel}
          </p>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

ChampionDetails.propTypes = {
  open: PropTypes.bool,
  champion: PropTypes.object,
  onClose: PropTypes.func,
};
