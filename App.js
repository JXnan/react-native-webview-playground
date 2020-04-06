/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import WebView from 'react-native-webview'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {

  _onPressButton = () => {
    // 向web注入js 可以直接注入一个函数调用
    this.webView && this.webView.injectJavaScript('window.webFunc(`rn通过injectJavaScript直接调用web方法`)')
  }

  // web使用 window.ReactNativeWebView.postMessage 向rn发送消息
  _onWebMessage = ({ nativeEvent: { data } }) => {
    console.log(JSON.parse(data))
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <WebView
          style={{ flex: 1, backgroundColor: 'yellow' }}
          source={require('./src/test.html')}
          onMessage={this._onWebMessage}
          javaScriptEnabled={true}
          ref={ref => this.webView = ref}
        />
        <TouchableOpacity onPress={this._onPressButton} style={{ alignSelf: 'center', height: 40, justifyContent: 'center', marginBottom: 100 }}>
          <Text>点击调用web方法</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default App;
