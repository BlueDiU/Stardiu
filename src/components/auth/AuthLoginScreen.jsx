import React, { useEffect } from 'react';

/* libs */
import { ROUTE } from '../../constants/auth-routes';

/* hooks */
import { useForm } from 'react-hook-form';

/* Components */
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import AuthErrorMessage from './AuthErrorMessage';
import GoogleButton from './googleButton/GoogleButton';
/* GOOGLE AUTH */
import GoogleLogin from 'react-google-login';
import AuthContinue from './AuthContinue';

/* Context */
import { useDispatch } from 'react-redux';
import {
  startLoginWithEmailPassword,
  startLoginWithGoogle,
} from '../../context/actions/auth.action';

function AuthLoginScreen() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const responseGoogle = (resp) => {
    const { tokenId } = resp;

    if (tokenId) {
      dispatch(startLoginWithGoogle(tokenId));
    }
  };

  useEffect(() => {
    document.title = 'Stardiu - Iniciar sección';
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container p-4"
      >
        <Slide top>
          <h3 className="mt-3 mb-4">Iniciar sección</h3>

          <GoogleLogin
            // eslint-disable-next-line no-undef
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />

          <section className="form-outline">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              defaultValue=""
              className="form-control border"
              {...register('email', {
                required: true,
                maxLength: 20,
                pattern: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
              })}
            />
            {errors.email && (
              <AuthErrorMessage msg="El correo no es valido" />
            )}
          </section>

          <section className="form-outline">
            <label
              htmlFor="password"
              className="form-label mt-1"
            >
              Contraseña
            </label>

            <input
              type="password"
              id="password"
              defaultValue=""
              className="form-control border"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 22,
              })}
            />

            {errors.password && (
              <AuthErrorMessage msg="La contraseña no es valida, debe tener al menos 6 letras o menos que 22" />
            )}
          </section>

          <AuthContinue />
        </Slide>

        <Link to={ROUTE.SIGN_IN} className="d-block mt-3">
          Crear un cuenta
        </Link>
      </form>
    </div>
  );
}

export default AuthLoginScreen;
