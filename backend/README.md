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
