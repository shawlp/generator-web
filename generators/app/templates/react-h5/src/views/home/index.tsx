import React from 'react'
import styles from './index.less'

interface IProps {
  name: string
}

const ContentCom: React.FC<IProps> = ({ name }) => {
  return <div className="od">{name}</div>
}

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <ContentCom name="1111" />
    </div>
  )
}

export default Home
