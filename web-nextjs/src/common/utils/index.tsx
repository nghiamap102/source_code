import _ from 'lodash'

export const formatMoney = (value: any) => `${value}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'

export const formatTime = (time: any) => {
  return new Date(time).toLocaleTimeString('vi', {
    // day: "2-digit",
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDate = (date: any) => {
  return date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3-$2-$1')
}

export const isEmail = (emailAddress: string) => {
  return emailAddress.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}

export const formatQuery = (queryString: string) => {
  return JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const doubleNumber = (num: number): number => {
  return num * 2
}

export const getLineClamp = (countLine: number) => {
  return {
    display: '-webkit-box',
    '-webkit-line-clamp': `${countLine}`,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    width: '100%',
    'max-width': '100%',
    'word-break': 'break-word'
  }
}

export const funcWithDebounce = _.debounce((func) => func(), 500)
