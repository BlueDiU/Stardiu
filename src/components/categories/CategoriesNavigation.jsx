import React, { useEffect } from 'react';

/* context */
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startGetAllCategories } from '../../context/actions/category.action';

/* Components */
import CategoriesCard from './CategoriesCard';
import Fade from 'react-reveal/Fade';
import { MDBSpinner } from 'mdb-react-ui-kit';
import CategoriesContainer from './CategoriesContainer';
import Tabs from '../tabs/Tabs';

/* styles */
import '../menu/card/Card.css';

function CategoriesNavigation() {
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();
  const { records, isLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(startGetAllCategories());
  }, []);

  return (
    <div>
      <div className="mt-4 container">
        <Tabs />
      </div>
      <Switch>
        <Route exact path={`${path}/`}>
          <div className="container">
            <Fade right cascade>
              <h2 className="mt-5">Categorias</h2>
            </Fade>

            <hr />
            {isLoading ? (
              <div className="d-flex justify-content-center mt-5">
                <MDBSpinner color="dark">
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </MDBSpinner>
              </div>
            ) : (
              <Fade>
                <section className="cards-grid categories-mg">
                  <CategoriesCard url={url} records={records} />
                </section>
              </Fade>
            )}
          </div>
        </Route>

        {records?.map((record) => (
          <Route
            key={record._id}
            exact
            path={`${path}/${record.name}`}
          >
            <CategoriesContainer
              id={record._id}
              name={record.name}
            />
          </Route>
        ))}

        <Redirect to={`${path}`} />
      </Switch>
    </div>
  );
}

export default CategoriesNavigation;
