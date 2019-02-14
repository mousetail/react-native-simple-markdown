import React, {Component, Fragment} from 'react';
import {Button, WebView, Keyboard, Text, View} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

export class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.webView = React.createRef();
        this.state = {
            value: "",
            html: undefined,
        };
    }

    componentDidMount(): void {
        const path = resolveAssetSource(require('./html/communication.html'));
        let source;

        if (__DEV__) {
            source = {uri: path.uri};
        } else if (Platform.OS === 'ios') {
            source = {uri: 'file://' + source.uri};
        } else {
            source = {uri: 'file:///android_asset/html/communication.html'};
        }

        fetch(source.uri).then(
            (e) => e.text()
        ).then(
            (html) => this.setState({html: html})
        ).catch(
            (err) => console.error(err)
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.html &&
                <WebView
                    ref={this.webView}
                    onMessage={ev => {
                        console.log(ev.nativeEvent.data);
                    }}
                    source={{html: this.state.html}}
                    javaScriptEnabled={true}
                    style={{
                        backgroundColor: '#F00'
                    }}
                    onError={ev => console.log(ev)}
                    domStorageEnabled={true}
                >
                    <Text>Within Editor Component</Text>
                </WebView>}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Button
                        title={'Make bold'}
                        style={{}}
                        onPress={() => this.webView.current.postMessage(JSON.stringify({command: 'bold'}))}
                    />
                    <Button
                        title={'Make italic'}
                        style={{}}
                        onPress={() => this.webView.current.postMessage(JSON.stringify({command: 'italic'}))}
                    />
                    <Button
                        title={'Make underline'}
                        style={{}}
                        onPress={() => this.webView.current.postMessage(JSON.stringify({command: 'underline'}))}
                    />
                </View>

            </Fragment>
        );
    }
}
