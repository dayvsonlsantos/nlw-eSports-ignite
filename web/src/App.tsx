import { useEffect, useState } from 'react';
import axios from 'axios';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';

import GameBanner from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';

//Indicamos o formato da informação que vamos salvar
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  //Variável games é um array de objetos que possuem o formato apresentado na interface
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(res => {
        setGames(res.data);
      })
  }, [])

  return (
    <article className='max-w-[1344px] mx-auto flex flex-col items-center my-20 w-full'>
      <img className='w-72' src={logoImg} alt="logo" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <section className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerurl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}

      </section>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>

    </article>
  )
}

export default App
