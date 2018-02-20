import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

export default class ListItem extends React.PureComponent {
  render() {
    const disableStyle = this.props.deleting ? styles.disable : null;
    return (
      <View style={[styles.viewItem, disableStyle]}>
        {this.props.deleting && <ActivityIndicator size="large" style={styles.activity} />}
        <Text style={styles.title}>{this.props.title}</Text>
        <Text>{this.props.body}</Text>
        <Text>{this.props.email}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={this._deletetingPost.bind(this)}>
          <Image source={require('../assets/rubbish-bin.png')} style={styles.imgStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  _deletetingPost = () => {
    debugger;
    if (this.props.deletePost) {
      this.props.deletePost(this.props.item);
    }
  };
}

const styles = StyleSheet.create({
  viewItem: {
    flex: 1,
    padding: 18
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
  disable: {
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  deleteButton: {
    alignItems: 'flex-end'
  },
  imgStyle: {
    width: 24,
    height: 24
  }
});
