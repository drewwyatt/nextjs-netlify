import { NextPage } from 'next'
import Layout from '../../components/MyLayout'
import { Show } from '../../models/show'

const Post: NextPage<{ show: Show }> = ({ show }) => (
  <Layout>
    <h1>{show.name}</h1>
    <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={show.image.medium} />
  </Layout>
)

Post.getInitialProps = async context => {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
