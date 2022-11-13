export const calcDate = (unixTime: number) => {
    return new Date(unixTime*1000).toLocaleString('ru-RU')
}
