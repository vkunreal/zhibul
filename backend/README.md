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

### GET `/api/categories`

Get all categories

### GET `/api/categories/:id`

Get all categories by parent id

### POST `/api/category/:id`

Add new category

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

### PUT `/api/change/item/`

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

# Options

### GET `/api/options/:item_id`

Get options of item

### PUT `/api/option`

Change option

## Body

| Name      | Type   |
| --------- | ------ |
| option_id | String |
| name      | String |
| value     | String |

### POST `/api/option`

Add new option

## Body

| Name    | Type   |
| ------- | ------ |
| item_id | String |
| name    | String |
| value   | String |

### DELETE `/api/option`

## Body

| Name      | Type   |
| --------- | ------ |
| option_id | String |

# Users

### GET `/api/users`

Get all users

### GET `/api/user/:id`

Get user by id

### POST `/api/user`

Add a new user

## Body

| Name    | Type   |
| ------- | ------ |
| phone   | String |
| name    | String |
| company | String |
| email   | String |
| comment | String |

### DELETE `/api/user`

Delete user

## Body

| Name | Type   |
| ---- | ------ |
| id   | String |

# Candidates

### GET `/api/candidates`

Get all candidates

### GET `/api/candidate/:id`

Get candidate by id

### POST `/api/candidate`

Add a new candidate

## Body

| Name    | Type   |
| ------- | ------ |
| phone   | String |
| name    | String |
| company | String |
| email   | String |
| comment | String |

### DELETE `/api/candidate`

Delete candidate

## Body

| Name | Type   |
| ---- | ------ |
| id   | String |
