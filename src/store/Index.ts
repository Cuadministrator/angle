import { observable, action, makeObservable, configure, runInAction, autorun } from 'mobx'

import net from 'net'
import { Socket } from 'net'
import { Server } from 'net'

import { getIpAddress } from 'react-native-device-info'

export interface Message {
  type: 'client' | 'server'
  text: string
}

const STATE_NORMAL = 0
const STATE_WARING = 1
const STATE_ERROR = 2

const STATUS_MAPPING = {
  [STATE_NORMAL]: '正常水位',
  [STATE_WARING]: '预警水位',
  [STATE_ERROR]: '危险水位',
  default: '错误的水位状态'
}

configure({
  enforceActions: 'always'
})

export class Global {
  constructor() {
      makeObservable(this)
  }
  @observable server: Server | null = null
  @observable socket: Socket | null = null
  @observable connecting = false
  @observable ip = '127.0.0.1'
  @observable port = '9999'
  @observable connectLoading = false

  @observable message: Message[] = []

  @action
  changeIpPort(ip, port) {
    this.ip = ip
    this.port = port
  }

  @action
  async initIp() {
    // 获取本地 ip
    await getIpAddress().then(res => {
      runInAction(() => {
        this.ip = res
      })
    })
  }

  @action
  async initServer() {
    const server = new net.Server()
    this.connectLoading = false
    server.on('connection', (socket) => {
      socket.write('Echo server')
      runInAction(() => {
        this.socket = socket
        this.connecting = true
        this.connectLoading = false
      })
    })

    server.on('connection', (socket) => {
      runInAction(() => {
        this.message = [{ type: 'server', text: 'Client connected to server on ' + JSON.stringify(socket.address())}, ...this.message]
      })

      socket.on('data', (data) => {
        runInAction(() => {
          let str = ''
          if (typeof data !== 'string') {
            const arr = new Uint16Array(data).toString().split(',')
            if (arr.length === 8) {
              str = STATUS_MAPPING[arr[arr.length - 2]]
            }
          } else {
            str = data
          }
          console.warn(typeof str, str)
          if (str) {
            this.message = [{ type: 'client', text: str }, ...this.message]
          }
        })
      })

      socket.on('error', (error) => {
        runInAction(() => {
          this.message = [{ type: 'server', text: `Connection error ${JSON.stringify(error) || ''}`}, ...this.message]
        })
      })

      socket.on('close', (error) => {
        runInAction(() => {
          this.message = [{ type: 'server', text: `Connection closed ${JSON.stringify(error) || ''}`}, ...this.message]
        })
      })
    })

    server.on('error', (error) => {
      runInAction(() => {
        this.connectLoading = false
        this.message = [{ type: 'server', text: 'Server error ' + error }, ...this.message]
      })
    })

    server.on('close', () => {
      runInAction(() => {
        this.message = [{ type: 'server', text: 'Server closed' }, ...this.message]
      })
    })

    this.server = server
  }

  @action
  async create() {
    // 如果正在连接中中断再创建新的连接
    if (this.connecting || this.connectLoading) return
    await this.initServer()
    runInAction(() => {
      this.connectLoading = true
    })
    this.server?.listen({ host: this.ip, port: parseInt(this.port, 0), reuseAddress: true })
  }

  @action
  close() {
    if (this.connecting && this.server) {
      try {
        this.server.close(() => {
          runInAction(() => {
            this.connecting = false
          })
        })
      } catch (err) {
        this.message = [{ type: 'server', text: 'There are still connections that cannot be terminated'}, ...this.message]
      }
    }
  }
}

const store = {
  global: new Global()
}

export default store
