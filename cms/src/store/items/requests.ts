import axios from 'axios'
import API from '../../utils/api'

interface IImageChunk {
  src: string
}

export const getItemImages = async (item_id: number) =>
  await axios.get(API + '/api/item/images/' + item_id).then(({ data }) => data)

// export const postLoadedImages = async (imagesJSON: any) => {
//   await axios.post('/upload', { imagesJSON }).then(({ data }) => {
//     console.log(data)
//   })
// }

export const putMainDB = async (src: string, token: string) =>
  await axios.put(
    API + '/api/item/image-main/',
    { src },
    {
      headers: {
        Authorization: token,
      },
    }
  )

export const deleteImageDB = async (src: string, token: string) => {
  return await axios
    .delete(API + '/api/item/delete/image', {
      headers: {
        authorization: token,
      },
      data: { src },
    })
    .then(({ data }) => data)
}
