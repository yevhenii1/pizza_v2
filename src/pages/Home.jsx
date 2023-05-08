import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { lists } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const items = useSelector((state) => state.pizza.items);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    console.log('id', id);
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    try {
      dispatch(
        fetchPizzas({
          categoryId,
          sort,
        }),
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = lists.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [sort.sortProperty, categoryId]);

  React.useEffect(() => {
    if (isMounted.current) {
      const quereString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      });
      navigate(`?${quereString}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categoryId]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
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
