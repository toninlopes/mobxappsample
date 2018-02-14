import { observable } from 'mobx';

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
   * Posts observable array.
   */
  @observable posts = [];

  /**
   * Fetchs post data from server.
   */
  async fetchPostsAsync() {
    try {
      const response = await fetch(this.POSTS_PATH);
      this.posts = await response.json();
    } catch (error) {
      console.log(`fetchPostsAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
    }
  }

  async deletePostAsync(post) {
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
