import Component from './Component';
import Validator from './Validator';

const onSubmitForm = (
  e: Event,
  form: HTMLFormElement,
  fields: Record<string, Component | Component[]>,
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

    signInFormData[input.name] = input.value;
  });

  if (!isError) {
    console.log('Отправлено -', signInFormData);
  }
};

export default onSubmitForm;
