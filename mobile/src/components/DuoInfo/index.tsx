import { ColorValue, Text, View } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
  //Definindo um padrão, onde caso a pessoa não escolha uma cor, será utilizado uma padrão
  //Esse ColorValue é uma tipagem dispinível no React Native
}

export function DuoInfo({ label, value, colorValue = THEME.COLORS.TEXT }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <Text 
        style={[styles.value, { color: colorValue }]}
        numberOfLines={1} //Faz com que o texto não passe de uma linha (caso o nome seja muito grande, assim coloca reticências)
      >
        {value}
      </Text>
    </View>
  );
}