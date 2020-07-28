const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state.js')
const imageDownloader = require('image-downloader')

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot() {
  const content = state.load()

  await fetchImagesOfAllSentences(content)
  await downloadAllImages(content)
  state.save(content)

  async function fetchImagesOfAllSentences(content) {
    for (const sentence of content.sentences) {
      const query = `${content.searchTerm} ${sentence.keywords[0]}`
      sentence.images = await fetchGoogleAndReturnImagesLinks(query)

      sentence.googleSearchQuery = query
    }
  }

  async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customSearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.searchEngineId,
      q: query,
      searchType: 'image',
      imgSize: 'huge',
      num: 2
    })

    const imagesUrls = response.data.items.map(item => item.link)

    return imagesUrls
  }

  async function downloadAllImages(content) {
    content.downloadImages = []

    for (const sentenceIndex in content.sentences) {
      const sentences = content.sentences
      const images = sentences[sentenceIndex].images

      for (const image of images) {
        const imageUrl = image

        try {
          // downloadImage(imageUrl)
          if (content.downloadImages.includes(imageUrl)) {
            throw new Error('Duplicate Image')
          }
          await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
          content.downloadImages.push(imageUrl)
          console.log('baixou com sucesso');
          break
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async function downloadAndSave(url, fileName) {
    return imageDownloader.image({
      url,
      dest: `./content/${fileName}`,
    })
  }
}

module.exports = robot
