import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { saveUser } from '@/redux/actions/userActions';

function Login() {
  const { fonts, layout } = useTheme();
  const dispatch = useDispatch();

  const doLogin = async () => {
    const userData = await login();
    dispatch(saveUser({ ...userData, isLoggedIn: true }));
    // Ideally save this to encrypted storage
    // storage.recrypt('some secret')
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
        <Text style={[fonts.size_16, fonts.gray800]}>Hello</Text>
        <Button title="Login" onPress={doLogin} />
      </View>
    </SafeScreen>
  );
}

export default Login;
