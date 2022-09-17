import { View, Image, FlatList } from 'react-native';
//FlatList exibe listas
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useEffect, useState } from 'react';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps){
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://192.168.1.2:3333/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games} //Passar os dados, nesse caso estamos pegando de GAMES
          keyExtractor={item => item.id} //Para dizer qual dado será utilizado como valor único
          renderItem={({ item }) => ( //Desestruturamos o item
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)} //Precisamos colocar assim devido que possui parâmetros
            />
          )} //Dizemos o que queremos renderizar
          showsHorizontalScrollIndicator={false} //Habilitar/desabilitar o indicador de rolagem
          horizontal //Coloca a lista na horizontal
          contentContainerStyle={styles.contentList} //Atribuindo um estilo
        />



      </SafeAreaView>
    </Background>
  );
}