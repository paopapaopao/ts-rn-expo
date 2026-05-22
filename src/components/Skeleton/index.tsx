import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 8,
    opacity: 0.7,
  },
});

const Skeleton = ({ style }: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['hsl(240.08 5.74% 26.15%)', 'hsl(240.08 5.71% 64.3%)'],
  });

  return (
    <Animated.View style={[styles.skeleton, style, { backgroundColor }]} />
  );
};

export default Skeleton;
