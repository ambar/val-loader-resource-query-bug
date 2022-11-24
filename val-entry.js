module.exports = (_, loaderContext) => {
  const entry = new URLSearchParams(loaderContext.resourceQuery).get('entry')
  return {
    code: `console.log('entry:', '${entry}')`,
  }
}
