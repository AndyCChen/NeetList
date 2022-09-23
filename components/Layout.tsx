import AppBar from '../components/appBar/AppBar'
import Footer from '../components/Footer'

type Props = {
   children: React.ReactNode
}

const Layout = ({ children }: Props) => {
   return (
      <div>
         <AppBar />
         <main>
            {children}
         </main>
         <Footer />
      </div>
   )
}

export default Layout