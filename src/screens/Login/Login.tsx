import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { saveUser } from '@/redux/actions/userActions';

function Login({ user, saveUser }: any) {
  const { fonts, layout } = useTheme();

  const doLogin = async () => {
    const userData = await login();
    saveUser({ ...userData, isLoggedIn: true });
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Text style={[fonts.size_16, fonts.gray800]}>Hello, {user?.name}</Text>
        <Button title="Login" onPress={doLogin} />
      </View>
    </SafeScreen>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
