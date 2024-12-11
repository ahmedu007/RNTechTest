import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';
import useAccount from '@/hooks/useAccount';
import useIsMounted from '@/hooks/useIsMounted';
import { useStatus } from '@/hooks/useStatus';

import { SafeScreen } from '@/components/templates';

import { createAccount } from '@/api';
import LogoutButton from '@/components/LogoutButton';
import { SuccessModal } from '@/components/SuccessModal';
import { logoutUser } from '@/redux/actions/userActions';
import { calculateBreakdown } from '@/utils';

function Home({ user }: any) {
  const { fonts, gutters, layout } = useTheme();
  const isMounted = useIsMounted();

  const {
    data: account,
    // isLoading,
    invalidateAccountQuery,
    refetch,
  } = useAccount(!isMounted());
  const { status, setStatus } = useStatus();
  const hasPendingAccount = !!account && account.status === 'pending';
  const hasAccount = !!account && account.status === 'completed';

  const handleCreateAccount = async () => {
    try {
      setStatus({ status: 'loading' });
      const account = await createAccount();

      if (account.status === 'completed') {
        setStatus({ status: 'idle' });
      }
      invalidateAccountQuery();
    } catch (e) {
      setStatus({ status: 'error' });
    }
  };

  const breakdown = calculateBreakdown(account?.balance || 0);

  return (
    <SafeScreen testID="home-screen">
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.justifyBetween,
            gutters.marginTop_80,
            gutters.paddingHorizontal_16,
            gutters.gap_12,
          ]}
        >
          <Text style={[fonts.size_16, fonts.gray800]}>{user?.name},</Text>

          {hasAccount ? (
            <View style={[gutters.gap_12]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                You account details:
              </Text>
              <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
                Balance: {account?.balance}
              </Text>
              <View style={[gutters.gap_12]}>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Breakdown:
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Monthly Interest: {breakdown?.interest}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Fees: {breakdown?.fees}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Taxes: {breakdown?.taxes}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
                  Available balance: {breakdown?.availableBalance}
                </Text>
              </View>
              <Button
                onPress={() => {
                  refetch();
                }}
                title="Increase balance"
                color="#2e8b57"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          ) : hasPendingAccount ? (
            <>
              <Text style={[fonts.size_16, fonts.gray800]}>
                Your account has been successfully created. Please be patient
                while we activate your account
              </Text>
              <ActivityIndicator />
            </>
          ) : (
            <View style={[layout.itemsStart]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                You have no account, yet!
              </Text>
              <Button
                title={
                  status === 'loading'
                    ? 'Creating your account...'
                    : 'Create one'
                }
                onPress={handleCreateAccount}
              />
            </View>
          )}

          <LogoutButton />
        </View>
      </ScrollView>
      <SuccessModal modalVisible={hasAccount && !hasPendingAccount} />
    </SafeScreen>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
