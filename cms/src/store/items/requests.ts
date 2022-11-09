import axios from 'axios'

interface IImageChunk {
  src: string
}

export const getItemImages = async (item_id: number) => {
  let result: string[] = []
  await axios.get('/api/item/images/' + item_id).then(({ data }) => {
    result = data.map((chunk: IImageChunk) => chunk.src)
  })
  return result
}

// export const postLoadedImages = async (imagesJSON: any) => {
//   await axios.post('/upload', { imagesJSON }).then(({ data }) => {
//     console.log(data)
//   })
// }

export const deleteImageDB = async (src: string) => {
  return await axios
    .delete('/api/item/delete/image', { data: { src } })
    .then(({ data }) => data)
}
