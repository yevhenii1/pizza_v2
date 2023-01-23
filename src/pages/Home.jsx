import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63becc79e348cb076218d6c6.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
