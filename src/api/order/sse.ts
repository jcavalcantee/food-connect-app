import { EventSourcePolyfill } from 'event-source-polyfill';

let eventSource: EventSourcePolyfill | null = null;

// const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;
const ACCESS_IP_API = "http://10.0.0.58";

export function connectToOrderUpdates(
  orderId: number,
  onStatusUpdate: (status: string) => void
) {
  const url = `${ACCESS_IP_API}:8085/sse/order/${orderId}`;

  eventSource = new EventSourcePolyfill(url, {
    headers: {
    },
    heartbeatTimeout: 300_000,
  });

  eventSource!.addEventListener('status-updated', {
    handleEvent(event: Event) {
      const messageEvent = event as MessageEvent;
      console.log('Evento SSE recebido:', messageEvent);
      onStatusUpdate(messageEvent.data);
    }
  });

  eventSource.onerror = (event: any) => {
    const err = event?.error;

    // Verifica se é o erro de reconexão por inatividade
    if (
      err?.message?.includes?.('No activity within') &&
      err?.message?.includes?.('Reconnecting')
    ) {
      console.info('SSE reconectando por inatividade...');

      // Tenta evitar propagação do erro
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      }

      return;
    }

    console.error('Erro na conexão SSE:', event);
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
