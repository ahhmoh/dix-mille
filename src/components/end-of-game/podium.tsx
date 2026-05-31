import { useTheme } from '@/hooks/use-theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { TopPlayers } from './top-players';

const theme = useTheme();

interface PodiumProps {
  players: TopPlayers;
}

export const Podium = ({ players }: PodiumProps) => {
  const flexProportionFirst = new Animated.Value(0);
  const flexProportionSecond = new Animated.Value(0);
  const flexProportionThird = new Animated.Value(0);

  Animated.parallel([
    Animated.timing(flexProportionFirst, { toValue: 1, duration: 1200, useNativeDriver: false, easing: Easing.ease }),
    Animated.timing(flexProportionSecond, { toValue: 1, duration: 1000, useNativeDriver: false, easing: Easing.ease }),
    Animated.timing(flexProportionThird, { toValue: 1, duration: 800, useNativeDriver: false, easing: Easing.ease }),
  ]).start();

  return (
    <View style={styles.podiumContainer}>
      <View style={styles.podiumColumn}>
        <Text style={styles.playerName}>{players.second?.name}</Text>
        <Animated.View
          style={[
            styles.podium,
            styles.podiumSecond,
            { flex: flexProportionSecond.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] }) },
          ]}
        ></Animated.View>
      </View>
      <View style={styles.podiumColumn}>
        <MaterialCommunityIcons
          name='crown'
          size={40}
          style={styles.crownWinner}
        />
        <Text style={styles.playerName}>{players.first.name}</Text>
        <Animated.View
          style={[
            styles.podium,
            styles.podiumFirst,
            { flex: flexProportionFirst.interpolate({ inputRange: [0, 1], outputRange: [0, 0.9] }) },
          ]}
        ></Animated.View>
      </View>
      <View style={styles.podiumColumn}>
        <Text style={styles.playerName}>{players.third?.name}</Text>
        <Animated.View
          style={[
            styles.podium,
            styles.podiumThird,
            { flex: flexProportionThird.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
          ]}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  podiumContainer: { flex: 1, flexDirection: 'row' },
  podiumColumn: { flex: 1, justifyContent: 'flex-end' },
  podium: { borderWidth: 2, borderColor: theme.primary },
  podiumFirst: { backgroundColor: 'blue' },
  podiumSecond: { backgroundColor: 'yellow' },
  podiumThird: { backgroundColor: 'green' },
  crownWinner: { alignSelf: 'center', color: '#cfa312' },
  playerName: { fontSize: 20, alignSelf: 'center', color: theme.primary, marginBottom: 10 },
});
