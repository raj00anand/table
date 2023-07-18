// import Image from 'next/image'
// import styles from './page.module.css'
import MyPage from "./MyPage";


export default function Home() {
  if (typeof document !== 'undefined') {
    let bgColor = document.body.style.backgroundImage = "linear(to-r, teal.500, cyan.500)"
 }
  return (
    <main>
      <div>
        <MyPage />
      </div>
    </main>
  )
}
