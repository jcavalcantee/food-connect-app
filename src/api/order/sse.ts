import { EventSourcePolyfill } from 'event-source-polyfill';

let eventSource: EventSourcePolyfill | null = null;

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

export function connectToOrderUpdates(
  orderId: number,
  onStatusUpdate: (status: string) => void
) {
  const url = `${ACCESS_IP_API}:8085/sse/order/${orderId}`;

  eventSource = new EventSourcePolyfill(url, {
    headers: {
    },
    heartbeatTimeout: 60_000,
  });

  eventSource!.addEventListener('status-updated', {
    handleEvent(event: Event) {
      const messageEvent = event as MessageEvent;
      console.log('Evento SSE recebido:', messageEvent);
      onStatusUpdate(messageEvent.data);
    }
  });

  eventSource.onerror = (error) => {
    console.error('Erro na conexão SSE:', error);
  };

  console.info('SSE conectado para pedido', orderId);
}

export function disconnectFromOrderUpdates() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    console.info('SSE desconectado.');
  }
}
