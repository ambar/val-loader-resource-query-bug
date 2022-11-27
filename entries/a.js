import connect from 'connect'

export default function server() {
  const app = connect()
  app.use((req, res) => {
    res.end('Hello!')
  })
  return app
}
