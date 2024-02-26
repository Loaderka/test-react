const Card = ({header, options, text}) => {
  return (
    <div className="card">
      <h2 className="card__header">{header}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <p className="card__text">{text}</p>
    </div>
  );
}

export default Card;