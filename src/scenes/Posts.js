import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react/native';
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
    const disableStyle = item.deleting ? styles.disable : null;
    return (
      <View style={[styles.viewItem, disableStyle]} key={item.id}>
        {item.deleting && <ActivityIndicator size="large" style={styles.activity} />}
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.body}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => postsStore.deletePostAsync(item)}>
          <Image source={require('../assets/rubbish-bin.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
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
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginLeft: 12,
    marginRight: 12
  },
  viewItem: {
    flex: 1,
    padding: 18
  },
  disable: {
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  deleteButton: {
    alignItems: 'flex-end'
  }
});
