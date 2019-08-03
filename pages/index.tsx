import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import Layout from '../components/MyLayout'
import { Show } from '../models/show'

const ShowLink: FC<Show> = ({ id, name }) => (
  <li>
    <Link href={`/p/${id}`}>
      <a>{name}</a>
    </Link>
  </li>
)

type Props = { shows: Show[] }
const Index: NextPage<Props> = ({ shows }) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {shows.map((show, idx) => (
        <ShowLink key={idx} {...show} />
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data: { show: Show }[] = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry.show),
  }
}

export default Index
