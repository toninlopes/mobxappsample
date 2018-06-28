import { createStackNavigator } from 'react-navigation';
import Posts from '../scenes/Posts';
import Users from '../scenes/Users';
import SavePost from '../scenes/SavePost';

export default Routes = createStackNavigator({
    users: {
        screen: Users,
        navigationOptions: {
            title: 'Users'
        }
    },
    posts: {
        screen: Posts
    },
    savePost: {
        screen: SavePost,
        navigationOptions: {
            title: 'Edit Post'
        }
    }
});
