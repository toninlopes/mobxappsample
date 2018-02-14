import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import PostsStore from '../stores/PostsStore';

class Timer {
  @observable timer = 0;

  constructor() {
    setInterval(this.tick, 1000);
  }

  resetTimer = () => (this.timer = 0);

  tick = () => {
    console.log(`Timer => ${this.timer}`);
    this.timer += 1;
  };
}

@observer
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: new Timer(),
      postsStore: new PostsStore()
    };

    const { postsStore } = this.state;
    postsStore.fetchPostsAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`Seconds passed: ${this.state.appState.timer}`}</Text>
        <Button title="Reset the Timer" onPress={this._onReset.bind(this)} />
      </View>
    );
  }

  _onReset = () => this.state.appState.resetTimer();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
