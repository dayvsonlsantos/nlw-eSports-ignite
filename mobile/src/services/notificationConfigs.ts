import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({ //Função para lidar com notificação
  handleNotification: async () => ({
    shouldShowAlert: true, //Exibir um alerta
    shouldPlaySound: true, //Emitir som
    shouldSetBadge: true
  })
})