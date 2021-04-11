import { observable, action, makeObservable, configure, runInAction, autorun } from 'mobx'

import net from 'net'
import { Server, Socket } from 'net'

export interface Message {
  type: 'client' | 'server'
  text: string
}

configure({
  enforceActions: 'always'
})

export class Global {
  constructor() {
      makeObservable(this)
  }
  @observable server: Server | null = null // new net.Server()
  @observable connecting = false
  @observable ip = '127.0.0.1'
  @observable port = '9999'
  @observable connectLoading = false

  @observable client: Socket | null = null
  @observable clientConnecting = false
  @observable clientIp = '192.168.31.141'
  @observable clientPort = '1234'
  @observable clientConnectLoading = false

  @observable message: Message[] = []

  @action
  changeIpPort(ip, port) {
    this.ip = ip
    this.port = port
  }

  @action
  changeClientIpPort(ip, port) {
    this.clientIp = ip
    this.clientPort = port
  }

  @action
  initServer() {
    const server = new net.Server()
    this.connectLoading = false
    server.on('connection', (socket) => {
      socket.write('Echo server')
      runInAction(() => {
        this.connecting = true
        this.connectLoading = false
      })
    })

    server.on('connection', (socket) => {
      runInAction(() => {
        this.message = [...this.message, { type: 'server', text: 'Client connected to server on ' + JSON.stringify(socket.address())}]
      })

      socket.on('data', (data) => {
        runInAction(() => {
          if (data.toString()) {
            this.message = [...this.message, { type: 'client', text: data.toString() }]
          }
        })
      })

      socket.on('error', (error) => {
        runInAction(() => {
          this.message = [...this.message, { type: 'client', text: JSON.stringify(error) }]
        })
      })

      socket.on('close', (error) => {
        runInAction(() => {
          this.message = [...this.message, { type: 'client', text: JSON.stringify(error) }]
        })
      })
    })

    server.on('error', (error) => {
      runInAction(() => {
        this.connectLoading = false
        this.message = [...this.message, { type: 'server', text: 'Server error ' + error }]
      })
    })

    server.on('close', () => {
      runInAction(() => {
        this.message = [...this.message, { type: 'server', text: 'Server closed' }]
      })
    })

    this.server = server
  }

  @action
  initClient() {
    let client = new net.Socket()
    this.clientConnecting = false

    client.setKeepAlive(true)

    client.on('connect', () => {
      runInAction(() => {
        this.clientConnecting = true
        this.clientConnectLoading = false
        this.message = [...this.message, { type: 'server', text: 'connected to server!' }]
      })
    })
    client.on('data', (data) => {
      runInAction(() => {
        this.message = [...this.message, { type: 'client', text: data.toString() }]
      })
    });

    client.on('close', () => {
      runInAction(() => {
        console.warn('Client connect closed')
        this.clientConnecting = false
        this.message = [...this.message, { type: 'server', text: 'connection closed' }]
      })
    })

    this.client = client
  }

  @action
  create() {
    // 如果正在连接中中断再创建新的连接
    if (this.connecting || this.connectLoading) return
    this.initServer()
    this.connectLoading = true
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
        this.message = [...this.message, { type: 'server', text: 'There are still connections that cannot be terminated'} ]
      }
    }
  }

  @action
  connect() {
    if (this.clientConnectLoading || this.clientConnecting) return
    this.initClient()
    this.clientConnectLoading = true
    this.client?.connect({
      host: this.clientIp,
      port: parseInt(this.clientPort),
    }, () => {
      runInAction(() => {
        this.clientConnecting = true
        this.clientConnectLoading = false
      })
      this.client?.write('Hello, server! Love, Client.')
    })
  }

  @action
  destroy() {
    if (this.client && this.clientConnecting) {
      this.client.end('close', undefined, () => {
        runInAction(() => {
          this.clientConnecting = false
        })
      })
    }
  }
}

const store = {
  global: new Global()
}

export default store
