import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { observer, inject } from 'mobx-react/native';

@inject('postsStore')
@observer
export default class Post extends React.PureComponent {

    render() {
        const disableStyle = this.props.deleting ? styles.disable : null;
        return (
            <TouchableOpacity style={[styles.viewItem, disableStyle]}
                onPress={() => this._navigateTo()}>
                {this.props.deleting &&
                    <ActivityIndicator size="large"
                        style={styles.activity} />}
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text>{this.props.body}</Text>
                <Text>{this.props.email}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={async () => await this._deletetingPostAsync()}>
                    <Image source={require('../assets/rubbish-bin.png')} style={styles.imgStyle} />
                </TouchableOpacity>
            </TouchableOpacity >
        );
    }

    _deletetingPostAsync = async () => {
        const { postsStore } = this.props;
        await postsStore.deletePostAsync(this.props.id);
    };

    _navigateTo = () => {
        this.props.navigate('savePost', { user: this.props });
    }
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
