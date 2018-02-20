import { observable, action } from 'mobx';

export default class PostsStore {
  /**
   * Posts URI Host.
   */
  POSTS_URI = 'https://jsonplaceholder.typicode.com';

  /**
   * Posts path.
   */
  POSTS_PATH = `${this.POSTS_URI}/posts`;

  /**
   * Users path.
   */
  USER_PATH = `${this.POSTS_URI}/users`;

  /**
   * Posts observable array.
   */
  @observable posts = [];

  /**
   * Users observable map.
   */
  @observable users = new Map();

  /**
   * Fetchs post data from server.
   */
  @action
  async fetchPostsAsync() {
    try {
      const response = await fetch(this.POSTS_PATH);
      this.posts = await response.json();
    } catch (error) {
      console.log(`fetchPostsAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
    }

    try {
      this.fetchUsersAsync();
    } catch (error) {
      console.log(`fetchPostsAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
    }
  }

  /**
   * Fetchs user data from server.
   */
  @action
  async fetchUsersAsync() {
    this.posts.forEach(async post => {
      try {
        const response = await fetch(`${this.USER_PATH}/${post.userId}`);
        const user = await response.json();
        this.users.set(user.id, user.email);
      } catch (error) {
        console.log(`fetchUsersAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
      }
    });
  }

  /**
   * Deletes post from the posts list.
   * @param {Any} post
   */
  @action
  async deletePostAsync(post) {
    debugger;
    try {
      const index = this.posts.indexOf(post);
      if (index > -1) {
        this.posts[index] = Object.assign({}, post, { deleting: true });
      }
      const requestInit = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(`${this.POSTS_PATH}/${post.id}`, requestInit);
      debugger;
      if (response.ok && index > -1) {
        this.posts.splice(index, 1);
      }
    } catch (error) {
      console.log(`deletePostAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
    }
  }
}
