import {extendObservable} from 'mobx';

class UserStore{

    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username:'',
            Delbookid:'',
        })

        //const {user} = useAuth0;
        //const {name, picture, email} = user;
    }
}

export default new UserStore()