import { Collapse, List } from '@mui/material'
import { useUnit } from 'effector-react'
import { useState } from 'react'

import { setCategoryActiveFx } from '@entities/items'
import { env } from '@shared/config'

import { CategoryDetailsProps } from './interfaces'
import { CategoryRow } from './ui/CategoryRow'

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  categories,
  category,
  depth = 0,
  getCategories,
  setDeletedCategory,
  setChangedCategory,
  setParentId,
}) => {
  const setActive = useUnit(setCategoryActiveFx)
  const subcategories = getCategories(category.id).sort((a, b) =>
    a.name.localeCompare(b.name, 'ru'),
  )
  const hasChildren = subcategories.length > 0
  const [open, setOpen] = useState(depth === 0)

  return (
    <>
      <CategoryRow
        category={category}
        depth={depth}
        open={open}
        hasChildren={hasChildren}
        onToggle={() => setOpen((value) => !value)}
        onActiveChange={(active) => setActive({ id: category.id, active })}
        siteUrl={`${env.siteUrl}/menu/${category.url}`}
        onAdd={() => setParentId(category.id)}
        onEdit={() => setChangedCategory(category)}
        onDelete={() => setDeletedCategory(category)}
      />

      {hasChildren ? (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List disablePadding>
            {subcategories.map((subcategory) => (
              <CategoryDetails
                key={subcategory.id}
                category={subcategory}
                categories={categories}
                depth={depth + 1}
                getCategories={getCategories}
                setDeletedCategory={setDeletedCategory}
                setChangedCategory={setChangedCategory}
                setParentId={setParentId}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  )
}
