# React hook package - useDocumentVisibility


#### React hook, который скажет

- активна (видна) ли сейчас вкладку браузера скажет
- сколько раз с момента инициализации компонента вкладка становилась неактивной (невидимой)
- предоставит функцию, в которой можно подписаться на изменение активности (видимости) текущей вкладки

#### Пример работы хука

```javascript
import React from "react";
import { useDocumentVisibility } from "@my-npm-user/react-document-visibility";

const LeaveTabCounter = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log("first handler", isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
      console.log("second handler", isVisible);
    });

    setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
  }, []);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна?{" "}
        {visible ? "да" : "нет"}
      </span>
    </div>
  );
};
```

### Локальное использование библиотеки

В папке с бибилиотекой запускаем команды:

```
npm i
npm run build
npm link
```

В папке с проектом, в который хотим импортировать библиотеку, запускаем команды:

```
npm link <путь до библиотеки>/node_modules/react <путь до библиотеки>/node_modules/react-dom <путь до библиотеки>
npm link react-use-document-visibility
```

Например, в моем случае:

```
npm link C:\Users\1\Documents\GitHub\react-use-document-visibility\node_modules\react C:\Users\1\Documents\GitHub\react-use-document-visibility\node_modules\react-dom  C:\Users\1\Documents\GitHub\react-use-document-visibility
```

Импортируем библиотеку в нужный файл, в проекте:

```
import {useDocumentVisibility} from 'react-use-document-visibility'
```
