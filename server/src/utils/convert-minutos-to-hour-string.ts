// 1080 -> 18:00

export function convertMinutesToHourString(minutesAmount: number){
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  //Faz com que seja adicionado um zero, caso a hora/minutos não possua duas casas;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}