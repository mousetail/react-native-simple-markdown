import React, {Component, Fragment} from 'react';
import {Button, WebView, Keyboard, Text, View} from 'react-native';

export class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.webView = React.createRef();
        this.state = {
            value: "",
        };
    }



    render() {
        let jsCode = `
            document.querySelector("#test").addEventListener('input', function() {
                window.postMessage("test");
                try {
                    var selection = document.getSelection();
                    var range = selection.getRangeAt(0);
                    
                    window.postMessage("range: "+range.endOffset);
                }
                catch (err) {
                    window.postMessage("error"+err);
                }
            });
            document.querySelector('*').style.backgroundColor = 'blue';
            document.addEventListener('message', function(e) {
                document.getElementById('test').innerHTML = "<b>" + document.getElementById('test').innerHTML + "</b>";
            });
        `;

        return (
            <Fragment>
                <Button
                    title={'Make bold'}
                    onPress={() => this.webView.current.postMessage('bold')}
                />
                <WebView
                    ref={this.webView}
                    onMessage={ev => {
                        console.log(ev.nativeEvent.data);
                    }}
                    source={{
                        html: '' +
                            '<div ' +
                            'id="test" contenteditable="true" ' +
                            'oninput="sendSelection()"' +
                            '>' +
                            'Test text' +
                            '</div>'
                    }}
                    javaScriptEnabled={true}
                    style={{
                        backgroundColor: '#FFFFFF'
                    }}
                    onError={ev => console.log(ev)}
                    injectedJavaScript={
                        jsCode
                    }
                >
                    <Text>Within Editor Component</Text>
                </WebView>
            </Fragment>
        );
    }
}
