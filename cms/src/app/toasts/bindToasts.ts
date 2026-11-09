import {
  addCategoryFx,
  addItemFx,
  changeCategoryFx,
  changeItemFx,
  copyItemFx,
  deleteCategoryFx,
  deleteItemFileFx,
  deleteItemFilesFx,
  deleteItemFx,
  deleteItemImageFx,
  setCategoryActiveFx,
  setMainItemImageFx,
  uploadCategoryImageFx,
  uploadItemFileFx,
  uploadItemImagesFx,
} from '@entities/items'
import {
  addNewsFx,
  changeNewsFx,
  deleteNewsFx,
  deleteNewsMediaFx,
  uploadNewsMediaFx,
} from '@entities/news'
import {
  addOptionFx,
  changeOptionFx,
  changeOptionPositionsFx,
  deleteOptionFx,
  deleteOptionsFx,
} from '@entities/options'
import { addPageFx, changePageFx, deletePageFx } from '@entities/pages'
import { deleteCandidateFx, deleteUserFx } from '@entities/users'
import { changeValuteFx } from '@entities/valutes'
import {
  addVariableFx,
  changeVariableFx,
  deleteVariableFx,
} from '@entities/variables'
import { bindEffectToasts } from '@shared/toasts'

const fail = 'Что-то пошло не так. Попробуйте ещё раз'

bindEffectToasts(addItemFx, {
  id: 'items/add',
  loading: {
    title: 'Добавляем товар',
    description: 'Сохраняем карточку в каталоге…',
  },
  success: {
    title: 'Товар добавлен',
    description: 'Карточка успешно сохранена',
  },
  error: { title: 'Не удалось добавить товар', description: fail },
})

bindEffectToasts(changeItemFx, {
  id: 'items/change',
  loading: { title: 'Сохраняем товар', description: 'Обновляем карточку…' },
  success: { title: 'Товар обновлён', description: 'Изменения сохранены' },
  error: { title: 'Не удалось сохранить товар', description: fail },
})

bindEffectToasts(copyItemFx, {
  id: 'items/copy',
  loading: {
    title: 'Копируем товар',
    description: 'Создаём карточку, опции и файлы…',
  },
  success: {
    title: 'Товар скопирован',
    description: 'Открываем копию в новой вкладке',
  },
  error: { title: 'Не удалось скопировать товар', description: fail },
})

bindEffectToasts(deleteItemFx, {
  id: 'items/delete',
  loading: { title: 'Удаляем товар', description: 'Убираем карточку из каталога…' },
  success: { title: 'Товар удалён', description: 'Карточка больше не в каталоге' },
  error: { title: 'Не удалось удалить товар', description: fail },
})

bindEffectToasts(uploadItemFileFx, {
  id: 'items/upload-file',
  loading: { title: 'Загружаем файл', description: 'Отправляем вложение…' },
  success: { title: 'Файл загружен', description: 'Вложение успешно добавлено' },
  error: { title: 'Не удалось загрузить файл', description: fail },
})

bindEffectToasts(uploadItemImagesFx, {
  id: 'items/upload-images',
  loading: { title: 'Загружаем изображения', description: 'Отправляем фото…' },
  success: {
    title: 'Изображения загружены',
    description: 'Фото успешно добавлены',
  },
  error: { title: 'Не удалось загрузить изображения', description: fail },
})

bindEffectToasts(deleteItemFilesFx, {
  id: 'items/delete-files',
  loading: { title: 'Удаляем файлы', description: 'Убираем все вложения…' },
  success: { title: 'Файлы удалены', description: 'Вложения успешно удалены' },
  error: { title: 'Не удалось удалить файлы', description: fail },
})

bindEffectToasts(deleteItemFileFx, {
  id: 'items/delete-file',
  loading: { title: 'Удаляем файл', description: 'Убираем вложение…' },
  success: { title: 'Файл удалён', description: 'Вложение успешно удалено' },
  error: { title: 'Не удалось удалить файл', description: fail },
})

bindEffectToasts(deleteItemImageFx, {
  id: 'items/delete-image',
  loading: { title: 'Удаляем изображение', description: 'Убираем фото…' },
  success: { title: 'Изображение удалено', description: 'Фото успешно удалено' },
  error: { title: 'Не удалось удалить изображение', description: fail },
})

bindEffectToasts(setMainItemImageFx, {
  id: 'items/set-main-image',
  loading: {
    title: 'Назначаем главное фото',
    description: 'Обновляем обложку товара…',
  },
  success: {
    title: 'Главное фото обновлено',
    description: 'Обложка товара сохранена',
  },
  error: { title: 'Не удалось сменить главное фото', description: fail },
})

bindEffectToasts(addCategoryFx, {
  id: 'categories/add',
  loading: {
    title: 'Добавляем категорию',
    description: 'Сохраняем раздел каталога…',
  },
  success: {
    title: 'Категория добавлена',
    description: 'Раздел успешно создан',
  },
  error: { title: 'Не удалось добавить категорию', description: fail },
})

bindEffectToasts(changeCategoryFx, {
  id: 'categories/change',
  loading: {
    title: 'Сохраняем категорию',
    description: 'Обновляем раздел каталога…',
  },
  success: {
    title: 'Категория обновлена',
    description: 'Изменения сохранены',
  },
  error: { title: 'Не удалось сохранить категорию', description: fail },
})

bindEffectToasts(deleteCategoryFx, {
  id: 'categories/delete',
  loading: {
    title: 'Удаляем категорию',
    description: 'Убираем раздел из каталога…',
  },
  success: {
    title: 'Категория удалена',
    description: 'Раздел больше не в каталоге',
  },
  error: { title: 'Не удалось удалить категорию', description: fail },
})

bindEffectToasts(setCategoryActiveFx, {
  id: 'categories/set-active',
  loading: {
    title: 'Обновляем статус категории',
    description: 'Сохраняем видимость раздела…',
  },
  success: {
    title: 'Статус категории обновлён',
    description: 'Изменения сохранены',
  },
  error: { title: 'Не удалось обновить статус категории', description: fail },
})

bindEffectToasts(uploadCategoryImageFx, {
  id: 'categories/upload-image',
  loading: {
    title: 'Загружаем изображение категории',
    description: 'Отправляем картинку…',
  },
  success: {
    title: 'Изображение категории загружено',
    description: 'Картинка успешно сохранена',
  },
  error: {
    title: 'Не удалось загрузить изображение категории',
    description: fail,
  },
})

bindEffectToasts(addPageFx, {
  id: 'pages/add',
  loading: { title: 'Добавляем страницу', description: 'Сохраняем содержимое…' },
  success: { title: 'Страница добавлена', description: 'Страница успешно создана' },
  error: { title: 'Не удалось добавить страницу', description: fail },
})

bindEffectToasts(changePageFx, {
  id: 'pages/change',
  loading: { title: 'Сохраняем страницу', description: 'Обновляем содержимое…' },
  success: { title: 'Страница обновлена', description: 'Изменения сохранены' },
  error: { title: 'Не удалось сохранить страницу', description: fail },
})

bindEffectToasts(deletePageFx, {
  id: 'pages/delete',
  loading: { title: 'Удаляем страницу', description: 'Убираем страницу с сайта…' },
  success: { title: 'Страница удалена', description: 'Страница больше недоступна' },
  error: { title: 'Не удалось удалить страницу', description: fail },
})

bindEffectToasts(addVariableFx, {
  id: 'variables/add',
  loading: {
    title: 'Добавляем переменную',
    description: 'Сохраняем значение…',
  },
  success: {
    title: 'Переменная добавлена',
    description: 'Значение успешно сохранено',
  },
  error: { title: 'Не удалось добавить переменную', description: fail },
})

bindEffectToasts(changeVariableFx, {
  id: 'variables/change',
  loading: {
    title: 'Сохраняем переменную',
    description: 'Обновляем значение…',
  },
  success: {
    title: 'Переменная обновлена',
    description: 'Изменения сохранены',
  },
  error: { title: 'Не удалось сохранить переменную', description: fail },
})

bindEffectToasts(deleteVariableFx, {
  id: 'variables/delete',
  loading: {
    title: 'Удаляем переменную',
    description: 'Убираем значение…',
  },
  success: {
    title: 'Переменная удалена',
    description: 'Значение успешно удалено',
  },
  error: { title: 'Не удалось удалить переменную', description: fail },
})

bindEffectToasts(addNewsFx, {
  id: 'news/add',
  loading: { title: 'Публикуем новость', description: 'Сохраняем материал…' },
  success: { title: 'Новость опубликована', description: 'Материал успешно создан' },
  error: { title: 'Не удалось опубликовать новость', description: fail },
})

bindEffectToasts(changeNewsFx, {
  id: 'news/change',
  loading: { title: 'Сохраняем новость', description: 'Обновляем материал…' },
  success: { title: 'Новость обновлена', description: 'Изменения сохранены' },
  error: { title: 'Не удалось сохранить новость', description: fail },
})

bindEffectToasts(deleteNewsFx, {
  id: 'news/delete',
  loading: { title: 'Удаляем новость', description: 'Убираем материал…' },
  success: { title: 'Новость удалена', description: 'Материал успешно удалён' },
  error: { title: 'Не удалось удалить новость', description: fail },
})

bindEffectToasts(uploadNewsMediaFx, {
  id: 'news/upload-media',
  loading: {
    title: 'Загружаем медиа',
    description: 'Отправляем файл новости…',
  },
  success: { title: 'Медиа загружено', description: 'Файл успешно добавлен' },
  error: { title: 'Не удалось загрузить медиа', description: fail },
})

bindEffectToasts(deleteNewsMediaFx, {
  id: 'news/delete-media',
  loading: { title: 'Удаляем медиа', description: 'Убираем файл новости…' },
  success: { title: 'Медиа удалено', description: 'Файл успешно удалён' },
  error: { title: 'Не удалось удалить медиа', description: fail },
})

bindEffectToasts(addOptionFx, {
  id: 'options/add',
  loading: {
    title: 'Добавляем опцию',
    description: 'Сохраняем параметр товара…',
  },
  success: { title: 'Опция добавлена', description: 'Параметр успешно создан' },
  error: { title: 'Не удалось добавить опцию', description: fail },
})

bindEffectToasts(changeOptionFx, {
  id: 'options/change',
  loading: {
    title: 'Сохраняем опцию',
    description: 'Обновляем параметр товара…',
  },
  success: { title: 'Опция обновлена', description: 'Изменения сохранены' },
  error: { title: 'Не удалось сохранить опцию', description: fail },
})

bindEffectToasts(deleteOptionsFx, {
  id: 'options/delete-all',
  loading: {
    title: 'Удаляем опции',
    description: 'Убираем все параметры товара…',
  },
  success: { title: 'Опции удалены', description: 'Параметры успешно удалены' },
  error: { title: 'Не удалось удалить опции', description: fail },
})

bindEffectToasts(deleteOptionFx, {
  id: 'options/delete',
  loading: {
    title: 'Удаляем опцию',
    description: 'Убираем параметр товара…',
  },
  success: { title: 'Опция удалена', description: 'Параметр успешно удалён' },
  error: { title: 'Не удалось удалить опцию', description: fail },
})

bindEffectToasts(changeOptionPositionsFx, {
  id: 'options/change-positions',
  loading: {
    title: 'Сохраняем порядок опций',
    description: 'Обновляем позиции…',
  },
  success: {
    title: 'Порядок опций сохранён',
    description: 'Позиции успешно обновлены',
  },
  error: { title: 'Не удалось сохранить порядок опций', description: fail },
})

bindEffectToasts(changeValuteFx, {
  id: 'valutes/change',
  loading: { title: 'Сохраняем валюту', description: 'Обновляем курс…' },
  success: { title: 'Валюта обновлена', description: 'Изменения сохранены' },
  error: { title: 'Не удалось сохранить валюту', description: fail },
})

bindEffectToasts(deleteUserFx, {
  id: 'users/delete',
  loading: { title: 'Удаляем пользователя', description: 'Убираем аккаунт…' },
  success: {
    title: 'Пользователь удалён',
    description: 'Аккаунт успешно удалён',
  },
  error: { title: 'Не удалось удалить пользователя', description: fail },
})

bindEffectToasts(deleteCandidateFx, {
  id: 'candidates/delete',
  loading: {
    title: 'Удаляем кандидата',
    description: 'Убираем заявку…',
  },
  success: {
    title: 'Кандидат удалён',
    description: 'Заявка успешно удалена',
  },
  error: { title: 'Не удалось удалить кандидата', description: fail },
})
