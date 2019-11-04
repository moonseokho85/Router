import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  SwitchRow
} from "react-native-settings-page";

export default class SettingScreen extends React.Component {
  // TODO: implement your navigationOptions
  state = {
    switch: false,
    switch2: false
  };

  _navigateToScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Your-Screen-Name");
  };
  render() {
    return (
      <ReactNativeSettingsPage>
        <View style={{ marginTop: 10 }} />

        <SectionRow text="서비스">
          <SwitchRow
            text="알림"
            iconName="bell"
            _value={this.state.switch}
            _onValueChange={() => {
              this.setState({ switch: !this.state.switch });
            }}
          />

          <SwitchRow
            text="이벤트 및 마케팅 활용 동의"
            iconName="feed"
            _value={this.state.switch2}
            _onValueChange={() => {
              this.setState({ switch2: !this.state.switch2 });
            }}
          />
        </SectionRow>

        <SectionRow text="앱 설정">
          <NavigateRow
            text="언어"
            iconName="language"
            onPressCallback={this._navigateToScreen}
          />

          <NavigateRow
            text="디스플레이"
            iconName="tablet"
            onPressCallback={this._navigateToScreen}
          />
        </SectionRow>

        <SectionRow text="약관 및 정책">
          <NavigateRow
            text="회사 소개"
            iconName="home"
            onPressCallback={this._navigateToScreen}
          />

          <NavigateRow
            text="서비스 이용약관"
            iconName="pencil" //
            onPressCallback={this._navigateToScreen}
          />

          <NavigateRow
            text="위치정보 이용약관"
            iconName="bullseye"
            onPressCallback={this._navigateToScreen}
          />

          <NavigateRow
            text="개인정보 처리방침"
            iconName="user-secret"
            onPressCallback={this._navigateToScreen}
          />
        </SectionRow>

        <SectionRow text="기타">
          <NavigateRow
            text="버전 정보"
            iconName="flask"
            onPressCallback={this._navigateToScreen}
          />

          <NavigateRow
            text="회원탈퇴"
            iconName="drivers-license-o"
            onPressCallback={this._navigateToScreen}
          />
        </SectionRow>
      </ReactNativeSettingsPage>
    );
  }
}
