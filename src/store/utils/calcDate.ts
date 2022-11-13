export const calcDate = (unixTime: number) => {
    console.log(unixTime)
    return new Date(unixTime*1000).toLocaleString('ru-RU')
}
