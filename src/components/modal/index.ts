import './modal.scss';
import Component from '../../utils/Component';
import modalTemplate from './modal.hbs';

import Input from '../input';
import Button from '../button';

interface ModalProps {
  // default - input text else file
  type?: boolean;
  title: string;
  buttonTitle: string;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super({ ...props });
  }

  init() {
    this.children.inputText = new Input({
      label: 'Логин',
      name: 'user-action',
      type: 'text',
      styles: {
        label: 'input__label modal__input',
        input: 'input input_bottom-border',
      },
    });

    this.children.inputFile = new Input({
      label: 'Выбрать файл на компьютере',
      type: 'file',
      name: 'modal-input-file',
      styles: {
        label: 'modal__input-file',
        input: 'modal-input',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: this.props.buttonTitle,
      styles: {
        button: 'button button_contained',
      },
      events: {
        click: this.onSubmit,
      },
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    console.log('User action');
  }

  render() {
    return this.compile(modalTemplate, { ...this.props });
  }
}

export default Modal;
