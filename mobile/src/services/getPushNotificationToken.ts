import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken(){
  const { granted } = await Notifications.getPermissionsAsync(); //Para saber o usuário autorizou receber notificações

  if(!granted){//Se não tiver permitido a notificação, faça:
    await Notifications.requestPermissionsAsync();
  }

  if(granted){
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log('NOTIFICANTION TOKEN =>', pushToken.data);

    return pushToken.data;
  }

}