import { observable, action } from 'mobx';
import BaseStore from './BaseStore';

export default class PostsStore extends BaseStore {

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
    @action
    async fetchPostsAsync(userId) {
        try {
            this.isRefresing = true;
            const endpoint = `${this.POSTS_PATH}?userId=${userId}`
            const response = await fetch(endpoint);
            this.posts = await response.json();
        } catch (error) {
            console.log(`fetchPostsAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
        } finally {
            this.isRefresing = false;
        }
    }

    /**
     * Deletes post from the posts list.
     * @param {Any} post
     */
    @action
    async deletePostAsync(postId) {
        try {
            const postsFiltered = this.posts.filter((p) => p.id == postId);
            const index = this.posts.indexOf(postsFiltered[0]);
            if (index > -1) {
                this.posts[index] = Object.assign({}, postsFiltered[0], { deleting: true });
            }
            const requestInit = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(`${this.POSTS_PATH}/${postId}`, requestInit);
            if (response.status === 200) {
                const postsFiltered = this.posts.filter((p) => p.id == postId);
                const index = this.posts.indexOf(postsFiltered[0]);
                this.posts.splice(index, 1);
            }
        } catch (error) {
            console.log(`deletePostAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
        }
    }

    /**
   * Saves the post.
   * @param {*} post 
   */
    async savePostAsync(post) {
        try {
            debugger;
            const postsFiltered = this.posts.filter((p) => p.id == post.id);
            const index = this.posts.indexOf(postsFiltered[0]);
            if (index > -1) {
                this.posts[index] = Object.assign({}, postsFiltered[0], { deleting: true });
            }

            const requestInit = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            };
            const response = await fetch(`${this.POSTS_PATH}/${post.id}`, requestInit);
            const newPost = await response.json();
            debugger;
            if (index > -1) {
                this.posts[index] = Object.assign({}, newPost, { deleting: false });;
            }
        } catch (error) {
            console.log(`savePostAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
        }
    }
}
