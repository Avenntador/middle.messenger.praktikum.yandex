import Component from '../Component';
import Validator from '../Validator';

const onSubmitForm = (
  e: Event,
  form: HTMLFormElement,
  fields: Record<string, Component | Component[]>,
  cb: (data: any) => void,
) => {
  e.preventDefault();

  const inputs = form.getElementsByTagName('input');

  const formData: Record<string, string> = {};
  let isError = false;

  Array.from(inputs).forEach((input) => {
    const { name } = input;
    const { value } = input;
    const component = fields[name];

    if (!Validator.validate(name, component, value)) {
      isError = true;
    }

    if (!input.name.includes('repeat')) {
      formData[input.name] = input.value;
    }
  });

  if (!isError) {
    cb(formData);
  }
};

export default onSubmitForm;
