import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react/native';
import ListItem from '../components/ListItem';
import PostsStore from '../stores/PostsStore';

@observer
export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postsStore: new PostsStore()
    };
  }

  render() {
    const { postsStore } = this.state;
    console.log(`Render ${postsStore.posts.length} items`);
    return (
      <FlatList
        data={postsStore.posts}
        extraData={this.state}
        keyExtractor={this._keyExtractor.bind(this)}
        renderItem={this._renderItem.bind(this)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item, index }) => {
    const { postsStore } = this.state;
    // const disableStyle = item.deleting ? styles.disable : null;
    return (
      <ListItem
        key={item.id}
        item={item}
        title={item.title}
        body={item.body}
        deleting={item.deleting}
        email={postsStore.users.get(item.userId)}
        deletePost={async itemToDelete => postsStore.deletePostAsync(itemToDelete)}
      />
    );
  };

  async componentDidMount() {
    const { postsStore } = this.state;
    await postsStore.fetchPostsAsync();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginLeft: 12,
    marginRight: 12
  }
});
