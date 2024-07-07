import { useEffect, useState } from "react";

/**
 * @return   {Object}
 *           Объект с visible, count, onVisibilityChange
 *
 * @property {boolean} visible
 *           Является ли вкладка активной в текущий момент
 *
 * @property {number} count
 *           Количество раз, когда вкладка становилась не активной
 *
 * @property {(isVisibleFunc: (isVisible: boolean) => void) => () => void} onVisibilityChange
 *           Принимает пользовательскую функцию с параметром isVisible и подписывает на слушатель "visibilitychange"
 *
 * @example
 *   const LeaveTabCounter = () => {
 *      const { count, visible, onVisibilityChange } = useDocumentVisibility();
 *
 *     useEffect(() => {
 *        const unsubscribeHandler = onVisibilityChange((isVisible) => {
 *          console.log('handler', isVisible)
 *        });
 *        setTimeout(() => unsubscribeHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
 *      }, [])
 *
 *      return (
 *        <div>
 *          <span>
 *            Вы покинули страницу: {count} раз
 *            Вкладка активна? {visible ? 'да' : 'нет'}
 *          </span>
 *        </div>
 *      );
 *    };
 */

const isDocumentVisible = (): boolean => !document.hidden;

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(isDocumentVisible);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    const isVisible = isDocumentVisible();
    if (!isVisible && visible) setCount((prev) => prev + 1);
    setVisible(isVisible);
  };

  const onVisibilityChange = (isVisibleFunc: (isVisible: boolean) => void) => {
    const userIsVisibleFunc = () => {
      isVisibleFunc(isDocumentVisible());
    };
    document.addEventListener("visibilitychange", userIsVisibleFunc);
    return () =>
      document.removeEventListener("visibilitychange", userIsVisibleFunc);
  };

  return { visible, count, onVisibilityChange };
};
