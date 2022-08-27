# Zhibul backend

## Available Scripts

In the project directory, you can run:

### `npm install`

Runs installing dependencies

### `npm start`

Runs the app in the ready mode.\
Server would open on adress [http://localhost:5000](http://localhost:5000).

### `npm run dev`

Runs the app in the development mode.\
Server would open on adress [http://localhost:5000](http://localhost:5000).

# Routes

# Categories

### POST `/api/categories/`

Get all categories by parent id

## Body

| Name      | Type   |
| --------- | ------ |
| parent_id | String |

### POST `/api/category/`

Add new category

## Body

| Name      | Type   |
| --------- | ------ |
| name      | String |
| parent_id | String |

### DELETE `/api/category/`

Delete category

## Body

| Name | Type   |
| ---- | ------ |
| id   | String |

# Items

### GET `/api/items/:(category_id)||(null)`

Get items by category id or get all items

### GET `/api/item/:id`

Get item by id

### POST `/api/change/item/`

Change item

## Body

| Name         | Type   |
| ------------ | ------ |
| item_id      | String |
| category_id  | String |
| name         | String |
| brand        | String |
| manufacturer | String |
| price        | String |

### POST `/api/item/`

Add new item

## Body

| Name         | Type   |
| ------------ | ------ |
| category_id  | String |
| name         | String |
| brand        | String |
| manufacturer | String |
| price        | String |

### DELETE `/api/item/`

Delete item by id

## Body

| Name | Type   |
| ---- | ------ |
| id   | String |
