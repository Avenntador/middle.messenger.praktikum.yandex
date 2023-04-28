import './modal.scss';
import Component from '../../utils/Component';
import modalTemplate from './modal.hbs';

import Input from '../input';
import Button from '../button';

interface ModalProps {
  title: string;
  buttonTitle: string;
  type?: string;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super({ ...props });
  }

  protected init() {
    this.children.login = new Input({
      label: 'Логин',
      name: 'modal-login',
      type: 'text',
      selector: 'input',
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
      events: {
        change: (e: Event) => {
          this._onChangeInputHandler(e);
        },
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: this.props.buttonTitle,
      styles: {
        button: 'button button_contained button_fullwidth',
      },
      events: {
        click: this._onSubmit,
      },
    });
  }

  private _onChangeInputHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const fileName = target.files[0].name;
      (this.children.inputFile as Component).setProps({ fileInputLabel: fileName });
    }
  }

  private _onSubmit(e: any) {
    e.preventDefault();
    console.log('User action');
  }

  protected render() {
    return this.compile(modalTemplate, { ...this.props });
  }
}

export default Modal;
