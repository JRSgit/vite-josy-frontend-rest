/* eslint-disable react/prop-types */
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='md:px-10'>
        {children}
      </main>
      <Footer />
    </>
  )
}



export default Layout