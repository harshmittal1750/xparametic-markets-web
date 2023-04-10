import { useAppSelector } from 'hooks';

export default function useMarketForms() {
  const ui = useAppSelector(state => state.ui);
  const [form] = Object.keys(ui).filter(
    key => /Form/.test(key) && ui[key].visible
  );

  return form;
}
