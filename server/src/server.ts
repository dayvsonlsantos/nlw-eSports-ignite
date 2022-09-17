import express, { response } from "express";

//Protege a aplicação contra frontends que não queremos que acessem o backend
//Permite determinarmos quais endereções frontends possam acessar o nosso backend
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minute";
import { convertMinutesToHourString } from "./utils/convert-minutos-to-hour-string";

const app = express();
app.use(express.json()); //Para que o express consiga ler o json enviado
app.use(cors()) // -> Todos os frontend acessam o backend

/*
app.use(cors({
    origin: 'www.nomedosite.com.br'
})) 
*/

const prisma = new PrismaClient();

//Listagem de games
app.get('/games', async (req, res) =>{
    const games = await prisma.game.findMany({
        
        //Procurando todos os games e incluindo os ads
        include: { //Semelhante ao Join
            _count: { //Contagem
                select: {
                    ads: true,
                }
            }
        }
    })
    
    return res.json(games);
})

//Criar anúncio
app.post('/games/:id/ads', async (req, res) =>{
    const gameId = req.params.id;

    //Acessar o body da requisição
    const body: any = req.body;
    
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','), //Pois vem como array, e temos que salvar com ,
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return res.status(201).json(ad);
})

//Anúncios daquele game de determinado id
app.get('/games/:id/ads', async (req, res) => {
    
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        //Vários ads onde o gameId for igual ao parâmetro recebido
        where: {
            gameId: gameId
        },
        orderBy: { //Ordenador -> decrescente
            createdAt: 'desc'
        }
    })

    return res.json(ads.map(ad => {
        //Retorna todos os campos, e o weekDays retorna separadamente
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }));
})

//Discord daquele ads de determinado id
app.get('/ads/:id/discord', async (req, res) =>{
    const adId = req.params.id;
    

    //findUniqueOrThrow verifica se existe um ad com esse id, caso não encontre, dispara um erro;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return res.json({
        discord: ad.discord,
    });
})


app.listen(3333);