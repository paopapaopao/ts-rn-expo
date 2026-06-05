import { type TextInputProps, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = TextInputProps & { label?: string };

const styles = StyleSheet.create({
  view: { gap: 8 },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 8,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
});

const Input = ({ label, style, ...props }: Props) => {
  return (
    <View style={styles.view}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={[styles.input, style]}
      />
    </View>
  );
};

export default Input;
