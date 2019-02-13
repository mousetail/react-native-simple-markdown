import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {SlateEditor} from 'slate-editor';
import {Value} from 'slate';

export class RichTextEditor extends React.Component {
    render() {
        return (
            <View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#F00'
                }}
            >
                <Text>Within Editor Component</Text>
                {/*<Editor*/}
                    {/*id={'editor'}*/}
                    {/*autoCorrect={false}*/}
                    {/*autoFocus={true}*/}
                    {/*className={'test'}*/}
                    {/*commands={{}}*/}
                    {/*onChange={console.log.bind(this)}*/}
                    {/*placeholder={'sdfjhdfshsdf'}*/}
                    {/*plugins={[]}*/}
                    {/*queries={{}}*/}
                    {/*readOnly={false}*/}
                    {/*role={'textbox'}*/}
                    {/*// schema={{}}*/}
                    {/*spellCheck={true}*/}
                    {/*// value={'fjklfasdjklfsdjklsdf'}*/}
                    {/*style={{width: 500, height: 1000}}*/}
                    {/*tabIndex={1}*/}
                {/*/>*/}
            </View>
        );
    }
}