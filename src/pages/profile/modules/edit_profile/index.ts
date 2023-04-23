import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import editProfileTemplate from './edit_profile.hbs';

class EditProfilePage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      placeholder: 'pochta@gmail.com',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'login',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.nameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Ivan',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Ivanov',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.displayNameInput = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      placeholder: 'Ivan',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      placeholder: '+7(909)9673030',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Сохранить',
      events: {
        click: this._onSubmit,
      },
      styles: {
        button: 'profile__submit button button_contained',
      },
    });
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('Поменял профиль');
  }

  protected render() {
    return this.compile(editProfileTemplate, { ...this.props });
  }
}

export default EditProfilePage;
