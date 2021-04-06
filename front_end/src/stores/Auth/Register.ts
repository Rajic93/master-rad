
import { register } from '../../endpoints/auth'
import { action, computed, observable } from 'mobx';


class RegisterForm {
    @observable data: any = {
        email: '',
        password: '',
        confirmPassword: '',
        age: null,
        city: '',
        country: '',
        street: '',
        state: '',
    };

    @action setField(field: string, value: string) {
        this.data[field] = value;
    }

    @action submit() {
        return register(this.data);
    }

    @computed get email(): string {
        return this.data.email;
    }

    @computed get password() {
        return this.data.password;
    }

    @computed get confirmPassword() {
        return this.data.confirmPassword;
    }

    @computed get age() {
        return this.data.age;
    }

    @computed get city() {
        return this.data.city;
    }

    @computed get country() {
        return this.data.country;
    }

    @computed get street() {
        return this.data.street;
    }

    @computed get state() {
        return this.data.state;
    }
}

export default RegisterForm;
