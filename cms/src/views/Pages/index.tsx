import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addPagesDB,
  changePageDB,
  deletePageDB,
  getPagesDB,
} from '../../store/pages/actions'
import { selectPages } from '../../store/pages/selectors'
import AddPageButton from '../../components/AddButton'
import { AddPageMenu } from '../../components/AddPageMenu'
import { IPage } from '../../interfaces/App'
import './styles.scss'

export const Pages: React.FC = () => {
  const [addMenu, setAddMenu] = useState(false)
  const [changeMenu, setChangeMenu] = useState(false)
  const [changedPage, setChangedPage] = useState<IPage | null>(null)

  const pages = useSelector(selectPages)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPagesDB())
  }, [])

  const setChangePage = (page: IPage) => {
    setChangeMenu(true)
    setChangedPage(page)
  }

  const addPage = (page: IPage) => {
    setAddMenu(false)
    dispatch(addPagesDB(page))
  }

  const changePage = (page: IPage) => {
    setChangeMenu(false)
    dispatch(changePageDB(page))
  }

  const deletePage = (url: string) => {
    dispatch(deletePageDB(url))
  }

  return (
    <div className="pages pd-4">
      <h1>Страницы</h1>

      <p className="mt-2 mb-4">
        Страницы - раздел, в котором хранится статическая информация и картинки
        для страниц.
      </p>

      <div className="mt-2 d-flex flex-column g-2">
        <AddPageButton onClick={() => setAddMenu(true)}>
          Добавить страницу
        </AddPageButton>

        {pages.map((page) => (
          <div className="pages__page pd-2" key={page.url}>
            <div className="d-flex flex-column g-1">
              <h2>{page.name}</h2>
              <p>
                <b>URL:</b> {page.url}
              </p>
              <p>
                <b>Текст:</b> {page.text}
              </p>

              <h3 className="mt-2">SEO:</h3>
              <p>
                <b>Title:</b> {page.seo_title}
              </p>
              <p>
                <b>Description:</b> {page.seo_description}
              </p>
              <p>
                <b>Keywords:</b> {page.seo_keywords}
              </p>
            </div>

            <div className="d-flex g-2 mt-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setChangePage(page)}
              >
                Изменить
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deletePage(page.url)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AddPageMenu
        title="Добавление страницы"
        isOpen={addMenu}
        onClose={() => setAddMenu(false)}
        addPage={addPage}
      />

      <AddPageMenu
        title="Изменение страницы"
        isOpen={changeMenu}
        page={changedPage}
        onClose={() => setChangeMenu(false)}
        addPage={changePage}
        change
      />
    </div>
  )
}
