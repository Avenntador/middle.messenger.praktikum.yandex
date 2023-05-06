import Component from './Component';
import Validator from './Validator';
import RoutesPath from './Router/RoutePaths';

export const onSubmitForm = (
  e: Event,
  form: HTMLFormElement,
  fields: Record<string, Component | Component[]>,
  cb: (data: any) => void,
) => {
  e.preventDefault();

  const inputs = form.getElementsByTagName('input');

  const signInFormData: Record<string, string> = {};
  let isError = false;

  Array.from(inputs).forEach((input) => {
    const { name } = input;
    const { value } = input;
    const component = fields[name];

    if (!Validator.validate(name, component, value)) {
      isError = true;
    }

    if (!input.name.includes('repeat')) {
      signInFormData[input.name] = input.value;
    }
  });

  if (!isError) {
    cb(signInFormData);
  }
};

export const isProtectedCurrentRoute = () => {
  const currentLocation = window.location.pathname;
  return currentLocation === RoutesPath.SIGNIN || currentLocation === RoutesPath.SIGNUP;
};
