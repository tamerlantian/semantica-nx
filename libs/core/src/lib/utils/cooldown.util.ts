import { DestroyRef, Signal, inject, signal } from '@angular/core';

/**
 * Controlador de cuenta regresiva (cooldown) reutilizable.
 *
 * Expone los segundos restantes como signal y, opcionalmente, persiste el fin
 * del cooldown en `localStorage` para que sobreviva recargas de la página.
 */
export interface CooldownController {
  /** Segundos restantes (0 cuando no hay cooldown activo). */
  readonly remaining: Signal<number>;
  /** Inicia un cooldown de `seconds`; si se pasa `persistKey`, lo persiste. */
  start(seconds: number, persistKey?: string): void;
  /** Restaura un cooldown persistido bajo `persistKey` (si sigue vigente). */
  restore(persistKey: string): void;
  /** Detiene el cooldown y limpia el estado en memoria. */
  stop(): void;
}

const STORAGE_PREFIX = 'cooldown:';

function readEnd(key: string): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

function writeEnd(key: string, end: number): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, String(end));
  } catch {
    // Modo privado / almacenamiento no disponible: el cooldown vive solo en memoria.
  }
}

function clearEnd(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // Ignorar: no hay nada que limpiar si el almacenamiento no está disponible.
  }
}

/**
 * Crea un controlador de cooldown ligado al ciclo de vida del componente.
 *
 * Debe invocarse dentro de un contexto de inyección (campo-inicializador del
 * componente o `constructor`) porque inyecta `DestroyRef` para limpiar el
 * intervalo automáticamente al destruir el componente.
 */
export function createCooldown(): CooldownController {
  const destroyRef = inject(DestroyRef);
  const remaining = signal(0);

  let intervalId: ReturnType<typeof setInterval> | null = null;
  let activeKey: string | null = null;

  const clearTimer = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const tick = (): void => {
    const next = remaining() - 1;
    if (next <= 0) {
      remaining.set(0);
      clearTimer();
      if (activeKey) {
        clearEnd(activeKey);
      }
    } else {
      remaining.set(next);
    }
  };

  const run = (): void => {
    clearTimer();
    if (remaining() > 0) {
      intervalId = setInterval(tick, 1000);
    }
  };

  destroyRef.onDestroy(clearTimer);

  return {
    remaining,
    start(seconds, persistKey) {
      activeKey = persistKey ?? null;
      remaining.set(seconds);
      if (persistKey) {
        writeEnd(persistKey, Date.now() + seconds * 1000);
      }
      run();
    },
    restore(persistKey) {
      activeKey = persistKey;
      const end = readEnd(persistKey);
      if (end === null) {
        remaining.set(0);
        clearTimer();
        return;
      }
      const secs = Math.ceil((end - Date.now()) / 1000);
      if (secs > 0) {
        remaining.set(secs);
        run();
      } else {
        remaining.set(0);
        clearTimer();
        clearEnd(persistKey);
      }
    },
    stop() {
      clearTimer();
      remaining.set(0);
    },
  };
}
