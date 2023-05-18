import './modal.scss';
import Component from '../../utils/Component';
import modalTemplate from './modal.hbs';

import Input from '../input';
import Button from '../button';

interface ModalProps {
  title: string;
  buttonTitle: string;
  inputTitle?: string;
  selector?: string;
  isFile?: boolean;
  events?: Record<string, (args: any) => void>;
  submitCallback?: (...data: any) => void;
}

class Modal extends Component<ModalProps> {
  private _file: any;

  private _text: string;

  constructor(props: ModalProps) {
    super({
      ...props,
      selector: 'form',
      events: {
        submit: (e) => {
          e.preventDefault();
          if (props.submitCallback) {
            if (this.props.isFile) {
              props.submitCallback(this._file);
            } else {
              props.submitCallback(this._text);
            }
          }
        },
      },
    });

    this._text = '';
  }

  protected init() {
    this.children.login = new Input({
      label: this.props.inputTitle,
      name: 'modal-login',
      type: 'text',
      selector: 'input',
      styles: {
        label: 'input__label modal__input',
        input: 'input input_bottom-border',
      },
      events: {
        change: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this._text = target.value;
        },
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
    });
  }

  private _onChangeInputHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const fileName = target.files[0].name;
      const formData = new FormData();
      formData.append('avatar', target.files[0]);
      // eslint-disable-next-line prefer-destructuring
      // this._file = target.files[0];
      this._file = formData;

      (this.children.inputFile as Component).setProps({
        fileInputLabel: fileName,
      });
    }
  }

  protected render() {
    return this.compile(modalTemplate, { ...this.props });
  }
}

export default Modal;
