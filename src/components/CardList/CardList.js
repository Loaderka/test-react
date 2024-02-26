import React, {useEffect, useRef, useState} from "react";
import Card from "../Card";

const CardList = () => {
  const [data, setData] = useState([]);
  const ulRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data.json');
        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ulRef.current) {
      const lists = ulRef.current.querySelectorAll('ul');
      let maxHeight = 0;
      lists.forEach(list => {
        if (list.clientHeight > maxHeight) {
          maxHeight = list.clientHeight;
        }
      });
      lists.forEach(list => {
        list.style.height = `${maxHeight}px`;
      });
    }
  }, [data]);

  return (
    <div className="card__list" ref={ulRef}>
      {data.map((component, index) => (
        <Card key={index} header={component.header} options={component.options} text={component.text}/>
      ))}
    </div>
  );
}

export default CardList;
