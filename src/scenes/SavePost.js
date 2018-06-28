import React, { Component } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import { observer, inject } from 'mobx-react/native';

@inject('postsStore')
@observer
export default class SavePost extends Component {

    constructor(props) {
        super(props);

        const { user } = this.props.navigation.state.params;
        if (user) {
            this.state = {
                id: user.id,
                title: user.title,
                body: user.body,
                userId: user.userId
            };
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior='padding'>
                <TextInput style={styles.input}
                    value={this.state.title}
                    placeholder='Title'
                    editable={true}
                    onChangeText={(title) => this.setState({ title })} />
                <TextInput style={styles.input}
                    value={this.state.body}
                    placeholder='Message'
                    editable={true}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(body) => this.setState({ body })} />
                <Button title='Save'
                    onPress={async () => await this._saveAsync()} />
            </KeyboardAvoidingView>
        );
    }

    _saveAsync = async () => {
        this.props.navigation.goBack();
        const { postsStore } = this.props;
        await postsStore.savePostAsync(this.state);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 18
    },
    input: {
        marginBottom: 20
    },
    messageInput: {
        height: 200
    }
});
