import './upload_avatar.scss';
import uploadAvatarTemplate from './upload_avatar.hbs';
import Component from '../../../../utils/Component';
import Input from '../../../../components/input';
import Button from '../../../../components/button';

class UploadAvatar extends Component {
  constructor() {
    super({});
  }

  init() {
    this.children.fileInput = new Input({
      label: 'Выбрать файл на компьютере',
      type: 'file',
      name: 'avatar',
      styles: {
        label: 'avatar-modal__input',
        input: 'modal-input',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Поменять',
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
    console.log('Поменял');
  }

  render() {
    return this.compile(uploadAvatarTemplate, { ...this.props });
  }
}

export default UploadAvatar;
