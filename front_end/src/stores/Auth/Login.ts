import { login } from "../../endpoints/auth";
import { action, computed, observable } from "mobx";

class LoginForm {
    @observable data: any = {
        email: '',
        password: '',
    };

    @action setField(field: string, value: string) {
        this.data[field] = value;
    }

    @action submit() {
        return login(this.data);
    }

    @computed get email(): string {
        return this.data.email;
    }

    @computed get password(): string {
        return this.data.password;
    }
}

export default LoginForm;
