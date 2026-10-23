import { Divider, List } from '@mui/material'
import { Fragment } from 'react'

import { CategoryDetails } from '../../../CategoryDetails'

import { CategoryTreeProps } from './interfaces'

export const CategoryTree = ({
  categories,
  roots,
  getCategories,
  onAddChild,
  onEdit,
  onDelete,
}: CategoryTreeProps) => {
  return (
    <List disablePadding>
      {roots.map((category, index) => (
        <Fragment key={category.id}>
          {index > 0 ? <Divider component='li' /> : null}
          <CategoryDetails
            categories={categories}
            category={category}
            getCategories={getCategories}
            setParentId={onAddChild}
            setDeletedCategory={onDelete}
            setChangedCategory={onEdit}
          />
        </Fragment>
      ))}
    </List>
  )
}
