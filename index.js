import 'es6-symbol/implement';
import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import { Provider } from 'mobx-react/native';
import rootStores from './src/stores/RootStores';
import Routes from './src/routes/Routes';

import FetchMock from 'react-native-fetch-mock';
global.fetch = new FetchMock(require('./__mock__')).fetch;

const ProviderConfigured = () => (
    <Provider {...rootStores}>
        <SafeAreaView style={{ flex: 1 }}>
            <Routes />
        </SafeAreaView>
    </Provider>
);

AppRegistry.registerComponent('MobxAppSample', () => ProviderConfigured);
