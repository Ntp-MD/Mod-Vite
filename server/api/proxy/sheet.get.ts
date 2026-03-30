import { createError, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbhLBcw4jg80ogDxEeLs5wRrsQdFrWoN0g8OGy3aO_YJ0UoL-BIhuY8EozSzuTXppIIbfqp100FYIZ/pub?gid=1419480009&single=true&output=csv'

  try {
    const response = await fetch(sheetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'text/csv,application/json,*/*',
      },
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`,
      })
    }

    const csvText = await response.text()

    setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
    return csvText
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Google Sheet data',
    })
  }
})
