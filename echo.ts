import net from 'net';
import react, { useMemo, useCallback } from 'react'


const useSocket = () => {
  const server = useMemo(() => new net.Server(), [])
  const client = useMemo(() => new net.Socket(), [])
  const PORT = 44835 // useMemo(() => Number(9 + (Math.random() * 999).toFixed(0)), [])

  const init = useCallback(
    () => {
      server.on('connection', (socket) => {
        socket.write('Echo server');
      });
  
      server.listen({ port: PORT, host: '127.0.0.1', reuseAddress: true });
  
      client.connect(
        {
          port: 10086, // PORT,
          host: '218.88.20.195',
          // localAddress: '127.0.0.1',
          // reuseAddress: true,
          // localPort: 20000,
          // interface: "wifi",
          // tls: true
        },
        () => {
          client.write('Hello, server! Love, Client.');
        }
      );
  
      client.on('data', (data) => {
        if (typeof data === 'string' && data === 'close') {
          client.destroy(); // kill client after server's response
        }
      });
    },
    [],
  )
  
  return { init, server, client }
}

export default useSocket
