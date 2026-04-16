import { useState, useCallback } from 'react';

export function useHistory(initialState) {
  const [store, setStore] = useState({
    history: [initialState],
    currentIndex: 0
  });

  const set = useCallback((newState) => {
    setStore((prev) => {
      const newHistory = prev.history.slice(0, prev.currentIndex + 1);
      newHistory.push(newState);
      return {
        history: newHistory,
        currentIndex: newHistory.length - 1
      };
    });
  }, []);

  const undo = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.currentIndex
    }));
  }, []);

  const redo = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.history.length - 1 ? prev.currentIndex + 1 : prev.currentIndex
    }));
  }, []);

  const clearHistory = useCallback((newState) => {
    setStore({
      history: [newState],
      currentIndex: 0
    });
  }, []);

  return {
    state: store.history[store.currentIndex],
    set,
    undo,
    redo,
    clearHistory,
    canUndo: store.currentIndex > 0,
    canRedo: store.currentIndex < store.history.length - 1,
  };
}
