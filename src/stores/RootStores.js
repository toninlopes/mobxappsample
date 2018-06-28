import UsersStore from './UsersStore';
import PostsStore from './PostsStore';

class RootStores {

    constructor() {
        this.usersStore = new UsersStore();
        this.postsStore = new PostsStore();
    }
};

export default new RootStores();