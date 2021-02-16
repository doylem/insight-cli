interface Dict<T> {
  [key: string]: T
}

export default function arrayToDict<T>(data: Array<T>): Dict<T> {
  return data.reduce((agg: any, current: any, index) => {
    return { ...agg, [current._id || index]: current }
  }, {})
}
