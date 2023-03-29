import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

const useToastStore = create((set, get) => ({
  toastList: new Set(),
  show(toastId) {
    const { toastList } = get();

    const newToastList = new Set(toastList);
    newToastList.add(toastId);

    set({
      toastList: newToastList
    });
  },
  close(toastId) {
    const { toastList } = get();

    const newToastList = new Set(toastList);
    newToastList.delete(toastId);

    set({
      toastList: newToastList
    });
  },
  closeAll() {
    const newToastList = new Set();

    set({
      toastList: newToastList
    });
  }
}));

export default function useToastNotification() {
  const controls = useToastStore(
    store => ({
      show: store.show,
      close: store.close,
      closeAll: store.closeAll,
      toastList: store.toastList
    }),
    shallow
  );

  return controls;
}
